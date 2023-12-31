import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-white dark:bg-gray-900 p-5 dark:text-white px-6 pt-14 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative mx-auto max-w-2xl py-24"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            Unleash Your Creativity with Video Dubbing!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Bring your videos to life and add your voice to any scene. Let your
            imagination take the spotlight.
          </motion.p>
          <div className="mt-10 flex items-center justify-center gap-x-2">
            <a href="#dubbing">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="rounded-md bg-black dark:bg-white px-4 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-black dark:hover:bg-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white dark:focus-visible:ring-black"
              >
                Dub Video
              </motion.button>
            </a>

            <a href="#subtitle">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="rounded-md border border-black dark:border-white px-4 py-2 text-sm font-semibold text-black dark:text-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white dark:focus-visible:ring-black"
              >
                Create Subtitles
              </motion.button>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
