import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import siteLogo from "../../../assets/images/Asratul Hasan Nahid.png";
import "./Header.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  // Track page scroll to transition background opacities and borders dynamically
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Home", "About Me", "Expertise", "Projects", "Articles"];

  return (
    <header>
      <section
        id="portfolio-header"
        className={`fixed top-[12px] left-[20px] right-[20px] z-50 transition-all duration-300 max-w-7xl mx-auto animate-header-slide-down rounded-full ${
          isScrolled
            ? "bg-[#ffffff2d] border border-[#5dbf8b53] shadow-lg shadow-[#5DBF8A]/8"
            : "bg-[#ffffff2d] border border-[#5dbf8b53]"
        }`}
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="w-full px-5 sm:px-5 md:px-5 py-3 flex items-center justify-between">
          {/* Logo */}
          <div
            id="header-logo-container"
            className="animate-logo-fade-in shrink-0"
          >
            <a
              href="/"
              className="font-space font-bold text-2xl tracking-tight select-none"
            >
              <img
                src={siteLogo}
                alt="Asratul Hsan Nahid"
                className="w-32 object-contain"
              />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav
            id="header-desktop-navigation"
            className="hidden md:flex items-center gap-11"
          >
            {navItems.map((item, index) => (
              <button
                key={item}
                onClick={() => setActiveLink(item)}
                className={`font-poppins text-[16px] font-medium leading-none py-1 transition-colors duration-250 relative cursor-pointer ${
                  activeLink === item
                    ? "text-[#5DBF8A]"
                    : "text-[#111827] hover:text-[#5DBF8A]"
                } animate-nav-item nav-delay-${index} underline-slider`}
              >
                {item}
                {activeLink === item && (
                  <span className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-[#5DBF8A] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div
            id="header-right-actions"
            className="hidden md:flex items-center gap-3 animate-actions-fade-in"
          >
            {/* LinkedIn Icon */}
            <a
              id="linkedin-icon-link"
              href="https://linkedin.com/in/asratulhasannahid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#111827] hover:text-[#5DBF8A] transition-all duration-300 transform hover:scale-110 p-1 cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <svg
                className="w-6 h-6 fill-currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Let's Talk Button */}
            <a
              id="header-cta-button"
              href="mailto:asratulhasannahid@gmail.com"
              className="px-6 h-[46px] rounded-full bg-[#111827] text-white border border-[#111827] text-[16px] font-semibold font-poppins flex items-center justify-center gap-2.5 shadow-xs hover:shadow-md transition-all duration-300 hover:bg-[#5DBF8A] hover:text-white hover:border-[#5DBF8A] hover:scale-[1.02] cursor-pointer"
            >
              <span>Let's Talk</span>
              <ArrowRight size={15}></ArrowRight>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div
            id="header-mobile-hamburger"
            className="flex lg:hidden items-center gap-4"
          >
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neutral-800 p-2 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-[2px] bg-[#111827] rounded-full transition-all duration-300 origin-left ${
                    isMobileMenuOpen ? "rotate-45 translate-x-1" : ""
                  }`}
                />
                <span
                  className={`w-full h-[2px] bg-[#111827] rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`w-full h-[2px] bg-[#111827] rounded-full transition-all duration-300 origin-left ${
                    isMobileMenuOpen ? "-rotate-45 translate-x-1" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden rounded-t-4xl absolute top-[61px] left-0 w-full bg-white/95 backdrop-blur-lg border-b border-[#5DBF8A]/20 transition-all duration-300 ease-in-out origin-top overflow-hidden rounded-b-2xl shadow-xl ${
            isMobileMenuOpen
              ? "max-h-[380px] opacity-100 scale-y-100"
              : "max-h-0 opacity-0 scale-y-0 pointer-events-none"
          }`}
        >
          <div className="px-6 py-6 flex flex-col gap-4 border-t border-neutral-100/50">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveLink(item);
                  setIsMobileMenuOpen(false);
                }}
                className={`font-poppins text-lg font-medium tracking-tight text-left py-1 cursor-pointer transition-colors duration-250 ${
                  activeLink === item
                    ? "text-[#5DBF8A]"
                    : "text-[#111827] hover:text-[#5DBF8A]"
                }`}
              >
                {item}
              </button>
            ))}

            {/* Socials & Call-to-Action inside mobile menu */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-start gap-2">
              {/* Mobile LinkedIn icon */}
              <a
                href="https://linkedin.com/in/asratulhasannahid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111827] hover:text-[#5DBF8A] transition-colors p-2"
                aria-label="LinkedIn Profile"
              >
                <svg
                  className="w-6 h-6 fill-currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Mobile "Let's Talk" Button */}
              <a
                href="mailto:asratulhasannahid@gmail.com"
                className="flex-1 max-w-[200px] h-[46px] rounded-full bg-[#5DBF8A] text-white text-sm font-semibold font-poppins flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Let's Talk</span>
                <ArrowRight size={15}></ArrowRight>
              </a>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
