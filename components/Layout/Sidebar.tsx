import Link from "next/link";
import useDarkMode from "./useDarkMode";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import SidebarItem from "./SidebarItem";
import PkNetworkIcon from "../icons/PkNetworkIcon";
import PerignossiansIcons from "../icons/PerignossiansIcons";
import PkWorkIcons from "../icons/PkWorkIcons";
import LibraryIcon from "../icons/LibraryIcon";
import PkVocabIcon from "../icons/PkVocabIcon";
import FaqIcon from "../icons/FaqIcon";
import EncyclopediaIcon from "../icons/EncyclopediaIcon";
import PkUniversityIcon from "../icons/PkUniversityIcon";
import SettingsIcon from "../icons/SettingsIcon";

export default function Sidebar() {
  const [colorTheme, setTheme]: any = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <aside className="hidden sticky top-0 bg-blue lg:block justify-center h-screen w-1/8 pt-10 px-12">
        {/* <a href="/">
          <img src="/favicon.svg" className="m-auto mb-24" />
        </a> */}
        <nav className="text-white text-base font-semibold pt-3 grid justify-items-start">
          <h2 className="font-bold text-3xl mb-12 text-purple-darkest text-center">
            analitica
          </h2>
          <SidebarItem name="Inicio" link="/" icon={<PkNetworkIcon />} />
          <SidebarItem
            name="Subir datos"
            link="/perignossian"
            icon={<LibraryIcon />}
          />
         

          <SidebarItem
            name="Configuración"
            link="/configuracion"
            icon={<SettingsIcon />}
          />
          <SidebarItem name="Ayuda" link="/faq" icon={<FaqIcon />} />
        </nav>

        {/* {colorTheme === "light" ? (
          <PkNetworkIcon />
        ) : (
          <svg
            onClick={() => setTheme("dark")}
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 upgrade-btn bottom-0  text-white flex items-center justify-center py-32 m-auto"
            fill="black"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        )} */}
      </aside>

      {/** Mobile Nav Bar */}

      <div className="flex items-center justify-between lg:hidden w-full dark:bg-purple-137 px-4 pt-2">
        <div className="inline-flex items-center min-h-full">
          <Link href="/">
            <img
              className="h-20 w-20 p-4"
              src="/favicon.svg"
              alt="logo"
              onClick={() => setIsOpen(!isOpen)}
            />
          </Link>
          {colorTheme === "light" ? (
            <motion.div whileTap={{ rotate: 360 }}>
              <svg
                onClick={() => setTheme("light")}
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 bottom-0 flex items-center justify-center"
              >
                <path
                  d="M25.375 15.4546C25.1849 17.5114 24.413 19.4716 23.1496 21.1057C21.8861 22.7398 20.1834 23.9803 18.2406 24.6821C16.2979 25.3838 14.1955 25.5177 12.1794 25.0682C10.1633 24.6187 8.31695 23.6042 6.85636 22.1436C5.39576 20.683 4.38135 18.8367 3.93181 16.8206C3.48227 14.8045 3.6162 12.7021 4.31793 10.7594C5.01967 8.81662 6.26017 7.1139 7.8943 5.85045C9.52843 4.587 11.4886 3.81508 13.5454 3.625C12.3412 5.25416 11.7617 7.26142 11.9124 9.28171C12.0631 11.302 12.9338 13.2011 14.3664 14.6336C15.7989 16.0662 17.698 16.9369 19.7183 17.0876C21.7386 17.2383 23.7458 16.6588 25.375 15.4546Z"
                  fill="white"
                />
              </svg>
            </motion.div>
          ) : (
            <motion.div whileTap={{ rotate: 360 }}>
              <img
                onClick={() => setTheme("dark")}
                src="/images/moon.svg"
                className="w-7 bottom-0 flex items-center justify-center z-20"
              />
            </motion.div>
          )}
        </div>
        <motion.div whileTap={{ rotate: 360 }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white "
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <motion.div
                animate={{
                  originX: 54,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotate: 0,
                }}
              >
                <svg
                  className="stroke-current stroke-3 fill-current text-purple-137 dark:text-gray-137"
                  width="36"
                  height="24"
                  viewBox="0 0 36 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="2.5" y1="1.5" x2="21.5" y2="1.5" />
                  <line x1="1.5" y1="11.5" x2="34.5" y2="11.5" />
                  <line x1="10.5" y1="22.5" x2="29.5" y2="22.5" />
                </svg>
              </motion.div>
            ) : (
              <svg
                className="block h-6 w-6 stroke-current stroke-3 fill-current text-purple-137 dark:text-gray-137"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </motion.div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="lg:hidden" id="mobile-menu">
            <div
              ref={ref}
              className="px-2 pt-2 pb-3 space-y-1 sm:px-3 dark:bg-purple-137"
            >
              <Link href="/">
                <a
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-purple-137 dark:text-white font-semibold block px-3 py-2 rounded-md text-base"
                >
                  Home
                </a>
              </Link>
              <Link href="/about">
                <a
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-purple-137 dark:text-white font-semibold block px-3 py-2 rounded-md text-base"
                >
                  About
                </a>
              </Link>
              <Link href="/portfolio">
                <a
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-purple-137 dark:text-white font-semibold block px-3 py-2 rounded-md text-base"
                >
                  Portfolio
                </a>
              </Link>
              <Link href="/contact">
                <a
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-purple-137 dark:text-white font-semibold block px-3 py-2 rounded-md text-base"
                >
                  Contact
                </a>
              </Link>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
}
