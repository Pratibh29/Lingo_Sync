import React, { useRef, useState } from "react";
import LottiePlayer from "react-lottie-player";
import subtitle from "../assets/subtitle.json";
import { motion } from "framer-motion";

const Subtitle = () => {
  const languageCodes = {
    English: "en",
    Spanish: "es",
    French: "fr",
    German: "de",
    Italian: "it",
    Russian: "ru",
    "Chinese (Simplified)": "zh-CN",
    Japanese: "ja",
    Arabic: "ar",
    Hindi: "hi",
    Bengali: "bn",
    Telugu: "te",
    Tamil: "ta",
    Marathi: "mr",
    Urdu: "ur",
    Gujarati: "gu",
    Kannada: "kn",
    Odia: "or",
    Punjabi: "pa",
  };

  const [inputLanguage, setInputLanguage] = useState("en");
  const [outputLanguage, setOutputLanguage] = useState("hi");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadAvailable, setDownloadAvailable] = useState(false);
  const fileInputRef = useRef(null);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "subtitles.txt";
    a.click();
    URL.revokeObjectURL(downloadUrl);
  };

  const createSubtitles = async (event) => {
    event.preventDefault();

    const file = fileInputRef.current.files[0];

    if (!file) {
      setStatusMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("input_lang", inputLanguage);
    formData.append("output_lang", outputLanguage);

    try {
      setIsLoading(true);

      const response = await fetch("http://127.0.0.1:5000/generate_subtitles", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Subtitle generation failed.");
      }

      const subtitlesText = await response.text();

      // Handle the subtitles text - convert it to a downloadable file
      const blob = new Blob([subtitlesText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setDownloadAvailable(true);
      setStatusMessage("Subtitles generated successfully.");
      notifySuccess();
    } catch (error) {
      console.error("Subtitle generation error:", error);
      setStatusMessage("Subtitle generation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="subtitle"
      className="bg-white dark:bg-gray-900 p-5 min-h-screen flex justify-center items-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-center text-5xl mb-12 font-medium  text-gray-900 dark:text-white">
          Create Subtitles
        </h1>
        <div className="flex items-center justify-center flex-col-reverse lg:flex-row gap-8">
          <div className="lg:w-1/2 p-4 flex justify-center items-center">
            <form
              id="uploadForm"
              encType="multipart/form-data"
              onSubmit={(e) => {
                e.preventDefault();
                createSubtitles(e);
              }}
              className="max-w-md mx-auto lg:mx-0"
            >
              <label
                htmlFor="fileInput"
                className="block text-sm font-semibold text-gray-900 dark:text-white"
              >
                Select File for Subtitle Creation:
              </label>
              <input
                type="file"
                id="fileInput"
                accept=".mp4,.mp3"
                ref={fileInputRef}
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white dark:border-white"
              />
              <div className="mt-3 mb-4 w-full flex space-x-10">
                <div className="w-1/2">
                  <label
                    htmlFor="inputLanguage"
                    className="block text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Select Input Language:
                  </label>
                  <select
                    id="inputLanguage"
                    value={inputLanguage}
                    onChange={(e) => setInputLanguage(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white dark:bg-gray-900 dark:border-white"
                  >
                    {Object.entries(languageCodes).map(([name, code]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-1/2">
                  <label
                    htmlFor="outputLanguage"
                    className="block text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Select Output Language:
                  </label>
                  <select
                    id="outputLanguage"
                    value={outputLanguage}
                    onChange={(e) => setOutputLanguage(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white dark:bg-gray-900 dark:border-white"
                  >
                    {Object.entries(languageCodes).map(([name, code]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex w-full space-x-10">
                <button
                  type="submit"
                  className="w-1/2 rounded-md border border-black dark:border-white px-4 py-2 text-sm font-semibold text-black dark:text-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white dark:focus-visible:ring-black"
                >
                  Generate subtitles
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!downloadAvailable}
                  className={`w-1/2 rounded-md bg-black dark:bg-white px-4 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-black dark:hover:bg-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white dark:focus-visible:ring-black  ${
                    downloadAvailable ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Download Subtitles
                </button>
              </div>
              {isLoading && (
                <p className="text-center mt-4 text-gray-600 font-semibold">
                  Generating subtitles...
                </p>
              )}
              {statusMessage && !isLoading && (
                <p className="text-center mt-4 text-red-600 font-semibold">
                  {statusMessage}
                </p>
              )}
            </form>
          </div>

          <div className="lg:w-1/2 flex justify-center items-center">
            <LottiePlayer
              loop
              play
              animationData={subtitle}
              style={{ width: "80%", maxWidth: "400px" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Subtitle;
