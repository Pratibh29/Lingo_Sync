import React from "react";
import {
  FaArrowUp,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaRegAddressCard,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-white py-6">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="mb-4">
          <a
            href="#top"
            onClick={scrollToTop}
            className="text-gray-700 dark:text-white hover:text-gray-400"
          >
            <FaArrowUp size={24} />
          </a>
        </div>

        <p className="text-gray-500 dark:text-gray-400 mb-2">Let's Connect:</p>

        <hr className="w-16 border-gray-400 dark:border-gray-600 mb-4" />
        <div className="flex items-center space-x-4 mb-4">
          <a
            target="_blank"
            href="https://www.instagram.com/__priyanshu.sharma/"
            className="text-gray-700 dark:text-white hover:text-gray-400"
          >
            <FaInstagram size={24} />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/priyanshu-sharma-025737216/"
            className="text-gray-700 dark:text-white hover:text-gray-400"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            target="_blank"
            href="https://github.com/Priyanshu-web-tech"
            className="text-gray-700 dark:text-white hover:text-gray-400"
          >
            <FaGithub size={24} />
          </a>
          <a
            target="_blank"
            href="https://priyanshu-sharma-portfolio.netlify.app/"
            className="text-gray-700 dark:text-white hover:text-gray-400"
          >
            <FaRegAddressCard size={24} />
          </a>
        </div>
        <p className="text-xs mb-4 text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} All rights reserved!
        </p>

        <hr className="w-24 border-gray-400 dark:border-gray-600 mb-4" />
      </div>
    </footer>
  );
};

export default Footer;
