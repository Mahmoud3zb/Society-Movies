import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaFilm,
  FaHeart,
  FaHome,
  FaTimes
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";





function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const { theme } = useSelector((state) => state.settings);

  // Set initial theme on component mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);


  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded transition-colors duration-200 ${
      isActive
        ? "text-red-500 hover:text-red-400"
        : "text-gray-300 hover:text-white"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center px-3 py-2 rounded-md text-base font-medium ${
      isActive
        ? "text-red-500"
        : "text-gray-300 hover:text-white hover:bg-gray-700"
    }`;

  return (
    <nav className="bg-gradient-to-r from-black to-gray-900 fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <FaFilm className="h-8 w-8 text-red-600" />
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent">
              Society Movies
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink
                to="/"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaHome className="text-lg" />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/movies"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaFilm className="text-lg" />
                <span>Movies</span>
              </NavLink>
              <NavLink
                to="/favorite"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaHeart className="text-lg" />
                <span>Favorites</span>
              </NavLink>
              <NavLink
                to="/contact"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaEnvelope className="text-lg" />
                <span>Contact</span>
              </NavLink>
            </div>

            

            
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-gray-800`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/" className={mobileNavLinkClass} onClick={toggleMenu}>
            <FaHome className="mr-2" />
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={mobileNavLinkClass}
            onClick={toggleMenu}
          >
            <FaFilm className="mr-2" />
            Movies
          </NavLink>
          <NavLink
            to="/favorite"
            className={mobileNavLinkClass}
            onClick={toggleMenu}
          >
            <FaHeart className="mr-2" />
            Favorites
          </NavLink>
          <NavLink
            to="/contact"
            className={mobileNavLinkClass}
            onClick={toggleMenu}
          >
            <FaEnvelope className="mr-2" />
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
