import { useState, useEffect, useRef } from "react";
import aboutImage from "../../../assets/images/Nahid.jpg";
import { ArrowRight } from "lucide-react";
import "./LittleAboutMe.css";

const LittleAboutMe = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className={`relative w-full py-24 md:py-32 bg-white overflow-hidden flex items-center justify-center font-poppins ${isVisible ? "is-visible" : ""}`}
      >
        {/* Background Grid Overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(93, 191, 139, 0.277) 1px, transparent 1px), linear-gradient(90deg, rgba(93, 191, 139, 0.277) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Background Blobs */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          {/* Blob Top-Right */}
          <div className="absolute top-[10%] right-[-8%] w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] rounded-full bg-[#5DBF8A] filter blur-[95px] opacity-[0.12] animate-about-blob-1" />

          {/* Blob Bottom-Left */}
          <div className="absolute bottom-[10%] left-[-10%] w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#5DBF8A] filter blur-[110px] opacity-[0.14] animate-about-blob-2" />
        </div>

        <div className="max-w-6xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Block */}
          <div className="relative w-full max-w-sm mx-auto lg:mx-0 group initial-hidden anim-left">
            <div className="relative aspect-[4/5] w-full">
              {/* Decorative Rings */}
              <div className="absolute inset-[-30px] rounded-full border border-dashed border-[#5DBF8A]/35 ring-cw transition-all duration-300"></div>
              <div className="absolute inset-[-50px] rounded-full border border-solid border-[#5DBF8A]/25 ring-ccw transition-all duration-300"></div>

              {/* Glow */}
              <div className="absolute inset-0 bg-[#5DBF8A] rounded-[20px] blur-[40px] pulse-glow-anim"></div>

              {/* Image Placeholder */}
              <div className="absolute inset-0 img-float border-[4px] border-[#5DBF8A] rounded-[20px] bg-gradient-to-br from-[#5DBF8A] to-[#3a8b61] flex items-center justify-center shadow-[0_0_30px_rgba(93,191,138,0.25)] transition-all duration-400 ease-out group-hover:shadow-[0_0_50px_rgba(93,191,138,0.4)] group-hover:scale-[1.02] z-10">
                <img
                  src={aboutImage}
                  alt="Nahid"
                  className="w-full h-full object-cover rounded-[20px]"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-start justify-center text-left space-y-8">
            {/* Heading */}
            <h2 className="font-space text-4xl md:text-5xl font-bold text-[#111827] leading-tight initial-hidden anim-up">
              The Mind Behind{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5DBF8A] to-[#4aa87a]">
                the Work
              </span>
            </h2>

            {/* Description */}
            <div className="pl-6 border-l-[3px] border-[#5DBF8A] initial-hidden anim-desc">
              <p className="text-[#6B7280] text-lg leading-relaxed font-normal">
                I am Asratul, a front-end developer and I work with code every
                day. When I joined Exprovia, I spent a good amount of time
                building with WordPress, Shopify, Framer, and Squarespace, and
                that experience still shapes how I think about the web. I care
                about the details most people skip. Outside the editor, I write
                on Medium sometimes. Not always about code. Just things I find
                worth saying.
              </p>
            </div>

            {/* CTA Button */}
            <div className="initial-hidden anim-btn">
              <a
                id="btn-lets-connect"
                href="/about-me"
                className="group/btn relative px-8 py-3.5 rounded-full bg-gray-950  border-gray-950 text-[#ffffff] font-space text-[15px] font-bold border  shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:bg-[#5DBF8A] hover:text-white hover:border-[#5DBF8A] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden text-center min-w-[170px]"
              >
                Meet Asratul
                <span className="text-base font-sans transition-transform duration-300 group-hover/btn:translate-x-1">
                  <ArrowRight size={15}></ArrowRight>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LittleAboutMe;
