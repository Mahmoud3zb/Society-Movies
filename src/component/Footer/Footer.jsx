import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaWhatsapp,
  FaEnvelope,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-black to-gray-900 bg-gray-900 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent">
                Society Movies
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Your ultimate destination for discovering and exploring the world
              of cinema. Find your next favorite movie today.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/movies"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/genre/action"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Action
                </Link>
              </li>
              <li>
                <Link
                  to="/genre/comedy"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Comedy
                </Link>
              </li>
              <li>
                <Link
                  to="/genre/drama"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Drama
                </Link>
              </li>
              <li>
                <Link
                  to="/genre/thriller"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Thriller
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest movie updates and
              recommendations.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-red-600 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Society Movies. All rights reserved.
          </p>
          <Link to="https://www.facebook.com/share/17atffXYPx/" target="_blank">
            <p>
              Made by{" "}
              <span className="text-red-500 bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent">
                Mahmoud 3zb
              </span>
            </p>
          </Link>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
