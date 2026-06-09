import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ExproviaImg from "../../../assets/images/exprovia.png";
import AHNImg from "../../../assets/images/AHN.jpg";
import "./Hero.css";

export default function Hero() {
  return (
    <section
      id="hero-section"
      className="relative min-h-[90vh] lg:min-h-screen flex items-center px-6 py-20 lg:py-32 overflow-hidden bg-white"
    >
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(93, 191, 138, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(93, 191, 138, 0.12) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Gradient Blurry Blobs Background */}
      <div className="hero-bg-blur">
        <div className="hero-gradient-blob bg-blob-1"></div>
        <div
          className="hero-gradient-blob bg-blob-2"
          style={{
            top: "40%",
            right: "-10%",
            left: "auto",
            width: "480px",
            height: "480px",
            background:
              "radial-gradient(circle at 50% 50%, rgba(93, 191, 138, 0.35), rgba(93, 191, 138, 0.1) 40%, transparent 70%)",
          }}
        ></div>
        <div
          className="hero-gradient-blob bg-blob-3"
          style={{
            bottom: "-15%",
            left: "20%",
            top: "auto",
            width: "560px",
            height: "560px",
            background:
              "radial-gradient(circle at 30% 70%, rgba(93, 191, 138, 0.4), rgba(93, 191, 138, 0.08) 45%, transparent 75%)",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Left Side Content Column */}
        <div
          id="hero-left-column"
          className="lg:col-span-7 flex flex-col items-start text-left z-10"
        >
          {/* Badge */}
          <div
            id="hero-badge"
            className="animate-hero-badge mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5DBF8A]/30 bg-[#5DBF8A]/5 text-[#5DBF8A] font-space text-[12px] font-bold uppercase tracking-[0.2em]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5DBF8A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5DBF8A]"></span>
            </span>
            Built with Intent.
          </div>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="animate-heading-up font-space text-5xl sm:text-5xl lg:text-[56px] xl:text-[72px] font-black text-gray-900 leading-[1.1] tracking-tight mb-6"
          >
            I Write{" "}
            <span className="highlight-word animate-shimmer-code">Code</span>.
            Browsers Turn It Into{" "}
            <span className="highlight-word animate-shimmer-experience">
              Experience.
            </span>
          </h1>

          {/* Description */}
          <p
            id="hero-description"
            className="animate-hero-description font-poppins text-[16px] sm:text-base text-gray-500 leading-relaxed max-w-xl mb-10 font-normal"
          >
            Front-end developer who cares about every pixel and every
            millisecond. I write clean, structured code, build fast and
            responsive interfaces, and make sure everything a user sees and
            touches feels intentional, smooth, and worth the effort.
          </p>

          {/* Buttons */}
          <div
            id="hero-buttons-container"
            className="animate-hero-buttons flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            {/* Let's Connect Button */}
            <a
              id="btn-lets-connect"
              href="#contact"
              className="group/btn relative px-8 py-3.5 rounded-full bg-gray-950  border-gray-950 text-[#ffffff] font-space text-[15px] font-bold border  shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:bg-[#5DBF8A] hover:text-white hover:border-[#5DBF8A] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden text-center min-w-[170px]"
            >
              Let's Talk{" "}
              <span className="text-base font-sans transition-transform duration-300 group-hover/btn:translate-x-1">
                <ArrowRight size={15}></ArrowRight>
              </span>
            </a>

            {/* LinkedIn Button */}
            <a
              id="btn-linkedin"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#5dbf8b18] border-[#5DBF8A] border-[1px] backdrop-blur-lg text-[#5DBF8A] font-space text-[15px] font-bold hover:bg-transparent hover:text-[#5DBF8A] hover:border-[#5DBF8A] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg
                id="linkedin-icon"
                className="w-4 h-4 fill-current mr-1"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              in LinkedIn
            </a>
          </div>
        </div>

        {/* Right Side Image Column */}
        <div
          id="hero-right-column"
          className="lg:col-span-5 flex justify-center items-center relative w-full mt-10 lg:mt-0"
        >
          <div className="relative w-full max-w-[340px] md:max-w-[450px]">
            {/* Outer motion wrapper with initial/animate states */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative flex justify-center items-center w-full"
            >
              {/* Layered Animated Blobs behind image */}
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-[#5DBF8A]/5 border-[40px] border-[#5DBF8A]/10 rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] scale-110 pointer-events-none"
              />
              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-[#5DBF8A]/5 border-[20px] border-[#5DBF8A]/10 rounded-[30%_60%_70%_40%_/_50%_60%_30%_60%] scale-125 opacity-30 pointer-events-none"
              />

              <div className="absolute inset-0 bg-[#5DBF8A]/20 blur-3xl rounded-full scale-75 opacity-50 animate-pulse pointer-events-none"></div>

              {/* Main Interactive Morphing Frame */}
              <motion.div
                animate={{
                  borderRadius: [
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                    "30% 60% 70% 40% / 50% 60% 30% 60%",
                    "70% 30% 50% 50% / 40% 70% 40% 60%",
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                  ],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-[340px] h-[340px] md:w-[450px] md:h-[450px] bg-white border-8 border-[#5DBF8A]/20 overflow-hidden shadow-[0_40px_100px_-20px_rgba(93,191,138,0.3)] p-1 z-10 group/img cursor-pointer"
              >
                <div
                  className="w-full h-full overflow-hidden bg-slate-100"
                  style={{ borderRadius: "inherit" }}
                >
                  <img
                    src={AHNImg}
                    alt="Asratul Hasan Nahid"
                    className="w-full h-full object-cover  brightness-110 transition-all duration-300 scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

              {/* Card Badge centered horizontally overlapping the bottom of the image */}
              <div
                id="card-badge"
                className="card-badge-container animate-card-badge absolute -bottom-6 left-[87%] left-margin-custom -translate-x-1/2 z-20 shadow-[0_15px_35px_-8px_rgba(0,0,0,0.08)] rounded-2xl bg-white/75 backdrop-blur-[5px] border border-white/40 p-4 flex items-center gap-3"
              >
                {/* Dot / Avatar initials circle */}
                <div id="card-badge-avatar" className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full text-white font-space font-bold flex items-center justify-center text-xs tracking-tight shadow-sm">
                    <img
                      className="rounded-full"
                      src={ExproviaImg}
                      alt="Exprovia"
                    />
                  </div>
                  {/* Alive status pulse */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#5DBF8A] rounded-full border-2 border-white animate-pulse"></span>
                </div>

                {/* Info Text */}
                <div id="card-badge-info" className="min-w-0 flex-1">
                  <h4 className="font-space font-bold text-gray-900 text-[17px] leading-tight mb-0.5 truncate">
                    Asratul Hasan Nahid
                  </h4>
                  <p className="font-poppins text-[13px] text-gray-500 leading-tight truncate">
                    Web & CMS Developer at Exprovia
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
