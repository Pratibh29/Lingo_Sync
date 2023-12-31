from flask import Flask, request, send_file
import os
from pydub import AudioSegment
from google.cloud import texttospeech, translate_v2 as translate
import whisper
from flask_cors import CORS
from moviepy.editor import VideoFileClip, AudioFileClip
import io
import tempfile

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "cred.json"


def extract_audio(uploaded_file, file_path):
    try:
        uploaded_file.save(file_path)
        return True
    except Exception as e:
        print(f"Error in extracting audio: {e}")
        return False


def transcribe_audio(wav_output_file, input_lang):
    try:
        model = whisper.load_model("tiny")
        result = model.transcribe(
            wav_output_file, language=input_lang, verbose=False, word_timestamps=True
        )
        print("Transcribed Text:", result["text"])
        return result["text"]
    except Exception as e:
        print(f"Error in transcription: {e}")
        return None


def translate_text(text, output_lang):
    try:
        translator = translate.Client()
        translation = translator.translate(text, target_language=output_lang)
        print("Translated Text:", translation["translatedText"])
        return translation["translatedText"]
    except Exception as e:
        print(f"Error in translation: {e}")
        return None


def create_audio_from_text(translated_text, output_lang):
    try:
        client = texttospeech.TextToSpeechClient()
        synthesis_input = texttospeech.SynthesisInput(text=translated_text)
        voice = texttospeech.VoiceSelectionParams(
            language_code=output_lang,
            name="",  # Example voice name
            ssml_gender=texttospeech.SsmlVoiceGender.MALE,  # Example voice gender
        )
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )
        response = client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )
        return response.audio_content
    except Exception as e:
        print(f"Error in audio creation: {e}")
        return None


def convert_to_wav(input_file, output_file):
    try:
        audio = AudioSegment.from_file(input_file)
        audio.export(output_file, format="wav")
        return True
    except Exception as e:
        print(f"Conversion failed: {e}")
        return False


def replace_audio_in_video(video_file, new_audio):
    try:
        # Load the video
        video = VideoFileClip(video_file)

        # Save the new audio to a temporary file
        with tempfile.NamedTemporaryFile(
            delete=False, suffix=".wav"
        ) as temp_audio_file:
            new_audio.export(temp_audio_file.name, format="wav")

        # Load the new audio into an AudioFileClip
        try:
            new_audio_clip = AudioFileClip(temp_audio_file.name)
        except Exception as e:
            print(f"Error loading new audio into an AudioFileClip: {e}")
            return

        # Check if the audio is compatible with the video
        if new_audio_clip.duration < video.duration:
            print(
                "Warning: The new audio is shorter than the video. The remaining video will have no sound."
            )
        elif new_audio_clip.duration > video.duration:
            print(
                "Warning: The new audio is longer than the video. The extra audio will be cut off."
            )
            new_audio_clip = new_audio_clip.subclip(0, video.duration)

        # Set the audio of the video to the new audio
        video = video.set_audio(new_audio_clip)

        # Write the result to a new video file
        output_filename = os.path.splitext(video_file)[0] + "_translated.mp4"
        try:
            video.write_videofile(output_filename, audio_codec="aac")
        except Exception as e:
            print(f"Error writing the new video file: {e}")
            return

        print(f"Translated video saved as {output_filename}")
        return output_filename

    except Exception as e:
        print(f"Error replacing audio in video: {e}")
    finally:
        # Remove the temporary audio file
        if os.path.isfile(temp_audio_file.name):
            os.remove(temp_audio_file.name)


@app.route("/convert_audio", methods=["POST"])
def convert_audio():
    if (
        "file" not in request.files
        or "input_lang" not in request.form
        or "output_lang" not in request.form
    ):
        return "Missing parameters in the request", 400

    uploaded_video_file = request.files["file"]
    input_lang = request.form["input_lang"]
    output_lang = request.form["output_lang"]

    if uploaded_video_file.filename == "":
        return "No selected file", 400

    video_path = "uploaded_video.mp4"

    # Save the uploaded video
    uploaded_video_file.save(video_path)

    # Extract audio from the uploaded video
    extracted_audio_path = "extracted_audio.wav"
    video_clip = VideoFileClip(video_path)
    video_audio = video_clip.audio
    video_audio.write_audiofile(extracted_audio_path, codec="pcm_s16le")
    video_clip.close()

    text = transcribe_audio(extracted_audio_path, input_lang)

    if text is None:
        return "Error in transcription", 500

    translated_text = translate_text(text, output_lang)

    if translated_text is None:
        return "Error in translation", 500

    audio_content = create_audio_from_text(translated_text, output_lang)

    if audio_content is None:
        return "Error in audio creation", 500

    # Convert the audio content to an AudioSegment
    converted_audio = AudioSegment.from_file(io.BytesIO(audio_content), format="mp3")

    # Replace audio in the uploaded video with the converted audio
    output_video = replace_audio_in_video(video_path, converted_audio)

    if output_video is None:
        return "Error replacing audio in video", 500

    # Clean up temporary files
    os.remove(video_path)
    os.remove(extracted_audio_path)

    return send_file(
        output_video, as_attachment=True, download_name="translated_video.mp4"
    )


@app.route("/generate_subtitles", methods=["POST"])
def generate_subtitles():
    if (
        "file" not in request.files
        or "input_lang" not in request.form
        or "output_lang" not in request.form
    ):
        return "Missing parameters in the request", 400

    uploaded_video_file = request.files["file"]
    input_lang = request.form["input_lang"]
    output_lang = request.form["output_lang"]

    if uploaded_video_file.filename == "":
        return "No selected file", 400

    video_path = "uploaded_video.mp4"

    # Save the uploaded video
    uploaded_video_file.save(video_path)

    # Extract audio from the uploaded video
    extracted_audio_path = "extracted_audio.wav"
    video_clip = VideoFileClip(video_path)
    video_audio = video_clip.audio
    video_audio.write_audiofile(extracted_audio_path, codec="pcm_s16le")
    video_clip.close()

    text = transcribe_audio(extracted_audio_path, input_lang)

    if text is None:
        return "Error in transcription", 500

    translated_text = translate_text(text, output_lang)

    if translated_text is None:
        return "Error in translation", 500

    # Return the translated text as subtitles
    return translated_text


if __name__ == "__main__":
    app.run(debug=True)
