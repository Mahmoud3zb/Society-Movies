import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";
import "./ContactMe.css";

function ContactMe() {
  // emailjs
  const form = useRef();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    // setIsSubmitting(true);

    emailjs
  .sendForm(
    "service_8ix0s1h",    // service ID
    "template_zryui2r",   // template ID
    form.current,         // form element
    "hkcAiEUeX1oDs04wc"   // public key as a string (4th argument)
  )
  .then(
    () => {
      console.log("SUCCESS!");
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    },
    (error) => {
      console.log("FAILED...", error.text);
      setSubmitStatus("error");
      setIsSubmitting(false);
    }
  );

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);

    
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {

  // };

  return (
    <div className="contact-page min-h-screen bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have questions or feedback? We'd love to hear from you. Fill out the
            form below or reach out through our social media channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
            {submitStatus === "success" ? (
              <div className="bg-green-900/50 border border-green-500 text-green-200 px-6 py-4 rounded-lg mb-6">
                Thank you for your message! We'll get back to you soon.
              </div>
            ) : null}

            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder=""
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Type your message here..."
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-xl p-8 h-full shadow-2xl">
              <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-red-600/20 p-3 rounded-lg">
                    <FaEnvelope className="text-red-500 text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">Email</h3>
                    <p className="text-gray-400 mt-1">
                      mahmoudazaab034@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start pt-6">
                  <div className="flex-shrink-0 bg-red-600/20 p-3 rounded-lg">
                    <FaPhone className="text-red-500 text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">
                      Call Me
                    </h3>
                    <p className="text-gray-400 mt-1">01006488707</p>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Follow Me
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.facebook.com/share/17atffXYPx/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors duration-200"
                      aria-label="Facebook"
                    >
                      <FaFacebook className="text-lg" />
                    </a>
                    <a
                      href="https://github.com/mahmoud3zb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors duration-200"
                      aria-label="GitHub"
                    >
                      <FaGithub className="text-lg" />
                    </a>
                    <a
                      href="https://wa.me/201006488707"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors duration-200"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp className="text-lg" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/mahmoud-3zb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors duration-200"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="text-lg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactMe;
