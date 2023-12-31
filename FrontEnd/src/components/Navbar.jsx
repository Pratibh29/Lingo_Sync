import React from "react";
import { motion } from "framer-motion";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ThemeBtn from "./ThemeBtn";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },

  {
    name: "Start Dubbing",
    href: "/dubbing",
  },
  {
    name: "Create Subtitles",
    href: "/subtitle",
  },
];
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full p-2 bg-white dark:bg-gray-900 dark:text-white"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span className="font-bold">LingoSync</span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900 dark:text-neutral-100 dark:hover:text-neutral-400"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:block">
          <ThemeBtn />
        </div>
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <FaBarsStaggered
              onClick={toggleMenu}
              className="h-6 w-6 cursor-pointer"
            />
          </motion.div>
        </div>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-x-0 top-0 z-50 origin-top-right  p-2  lg:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white dark:bg-gray-900  shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span className="font-bold">LingoSync</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:text-white"
                    >
                      <span className="sr-only">Close menu</span>
                      <FaXmark className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900 dark:text-gray-100">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
                <ThemeBtn />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
