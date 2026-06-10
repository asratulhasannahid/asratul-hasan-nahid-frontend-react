import { useState, useEffect, useRef } from "react";
import "./ExpertiseSection.css";
import { expertiseData } from "./ExpertiseData";

const ExpertiseSection = () => {
  const sectionRef = useRef(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePositions, setMousePositions] = useState({});

  const nodeRefs = useRef([]);
  const [visibleNodes, setVisibleNodes] = useState([false, false, false]);

  useEffect(() => {
    // Observer for the main section (Header and Line)
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
          sectionObserver.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    // Observer for individual timeline nodes
    const nodeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleNodes((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            nodeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    nodeRefs.current.forEach((ref) => {
      if (ref) nodeObserver.observe(ref);
    });

    return () => {
      sectionObserver.disconnect();
      nodeObserver.disconnect();
    };
  }, []);

  const handleMouseMove = (cardId, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePositions((prev) => ({
      ...prev,
      [cardId]: { x, y },
    }));
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full py-20 md:py-28 bg-[#ffffff] overflow-hidden"
      >
        {/* Gradient Blurry Blobs Background */}
        <div className="hero-bg-blur">
          {/* Top Left Blob - Extended */}
          <div
            className="hero-gradient-blob bg-blob-1"
            style={{
              top: "-15%",
              left: "-12%",
              width: "600px",
              height: "600px",
              background:
                "radial-gradient(circle at 25% 25%, rgba(93, 191, 138, 0.5), rgba(93, 191, 138, 0.15) 35%, transparent 70%)",
            }}
          ></div>
          {/* Top Right Blob - Extended */}
          <div
            className="hero-gradient-blob bg-blob-2"
            style={{
              top: "25%",
              right: "-15%",
              left: "auto",
              width: "550px",
              height: "550px",
              background:
                "radial-gradient(circle at 50% 50%, rgba(93, 191, 138, 0.4), rgba(93, 191, 138, 0.12) 40%, transparent 70%)",
            }}
          ></div>
          {/* Middle Blob - New */}
          <div
            className="hero-gradient-blob bg-blob-4"
            style={{
              top: "45%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "500px",
              height: "500px",
              background:
                "radial-gradient(circle at 50% 50%, rgba(93, 191, 138, 0.35), rgba(93, 191, 138, 0.1) 35%, transparent 70%)",
            }}
          ></div>
          {/* Bottom Left Blob - Extended */}
          <div
            className="hero-gradient-blob bg-blob-3"
            style={{
              bottom: "-20%",
              left: "15%",
              top: "auto",
              width: "650px",
              height: "650px",
              background:
                "radial-gradient(circle at 30% 70%, rgba(93, 191, 138, 0.45), rgba(93, 191, 138, 0.1) 45%, transparent 75%)",
            }}
          ></div>
        </div>

        {/* Geometric Overlay - Connected Circles Pattern */}
        <div className="absolute inset-0 z-[1] opacity-[0.07] select-none pointer-events-none">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 1000"
            className="text-[#5DBF8A]"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Connected Circles Pattern */}
            <g>
              {/* Main Center Circle */}
              <circle cx="500" cy="500" r="120" />
              <circle cx="500" cy="500" r="80" />
              <circle cx="500" cy="500" r="40" />
              <circle cx="500" cy="500" r="10" fill="#5DBF8A" />

              {/* Top Connection */}
              <line x1="500" y1="380" x2="500" y2="200" />
              <circle cx="500" cy="180" r="30" />
              <circle cx="500" cy="180" r="15" />
              <circle cx="500" cy="180" r="5" fill="#5DBF8A" />

              {/* Bottom Connection */}
              <line x1="500" y1="620" x2="500" y2="800" />
              <circle cx="500" cy="820" r="35" />
              <circle cx="500" cy="820" r="20" />
              <circle cx="500" cy="820" r="6" fill="#5DBF8A" />

              {/* Left Connection */}
              <line x1="380" y1="500" x2="200" y2="500" />
              <circle cx="180" cy="500" r="45" />
              <circle cx="180" cy="500" r="25" />
              <circle cx="180" cy="500" r="8" fill="#5DBF8A" />

              {/* Right Connection */}
              <line x1="620" y1="500" x2="800" y2="500" />
              <circle cx="820" cy="500" r="40" />
              <circle cx="820" cy="500" r="22" />
              <circle cx="820" cy="500" r="7" fill="#5DBF8A" />

              {/* Diagonal Connections */}
              <line x1="420" y1="420" x2="300" y2="300" />
              <circle cx="280" cy="280" r="25" />
              <circle cx="280" cy="280" r="12" />
              <circle cx="280" cy="280" r="4" fill="#5DBF8A" />

              <line x1="580" y1="420" x2="700" y2="300" />
              <circle cx="720" cy="280" r="28" />
              <circle cx="720" cy="280" r="14" />
              <circle cx="720" cy="280" r="5" fill="#5DBF8A" />

              <line x1="420" y1="580" x2="300" y2="700" />
              <circle cx="280" cy="720" r="32" />
              <circle cx="280" cy="720" r="16" />
              <circle cx="280" cy="720" r="5" fill="#5DBF8A" />

              <line x1="580" y1="580" x2="700" y2="700" />
              <circle cx="720" cy="720" r="30" />
              <circle cx="720" cy="720" r="15" />
              <circle cx="720" cy="720" r="5" fill="#5DBF8A" />
            </g>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div
            className={`mb-12 md:mb-16 ${isSectionVisible ? "anim-fade-up" : "opacity-0"}`}
          >
            <h2 className="font-space font-bold text-4xl md:text-5xl text-[#111827] mb-4">
              <span className="relative inline-block">
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5DBF8A] to-[#4aa87a]">
                  Expertise
                </span>
              </span>
            </h2>
            <p className="font-poppins text-base md:text-lg text-[#6B7280] max-w-2xl">
              Three areas of deep focus, built through real projects and
              delivered with full ownership.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div
              className={`absolute left-[6px] top-2 bottom-0 w-[2px] bg-gradient-to-b from-[#5DBF8A] to-[rgba(93,191,138,0.1)] ${isSectionVisible ? "anim-line" : "scale-y-0"}`}
            ></div>

            {/* Nodes Map */}
            {expertiseData.map((node, index) => {
              const isVisible = visibleNodes[index];

              return (
                <div
                  key={`node-${index}`}
                  data-index={index}
                  ref={(el) => (nodeRefs.current[index] = el)}
                  className={`relative pl-8 md:pl-12 ${index !== expertiseData.length - 1 ? "mb-10 md:mb-12" : ""}`}
                >
                  {/* Timeline Dot Wrapper (Handles bounce entrance) */}
                  <div
                    className={`absolute left-0 top-1.5 w-[14px] h-[14px] flex items-center justify-center z-10 ${isVisible ? "anim-dot-bounce" : "opacity-0 scale-0"}`}
                  >
                    {/* Inner Dot & Glow (Handles infinite pulse) */}
                    <div className="relative w-full h-full rounded-full bg-[#5DBF8A] border-[3px] border-white">
                      <div className="absolute inset-0 rounded-full shadow-[0_0_14px_rgba(93,191,138,0.45)] anim-dot-pulse-glow"></div>
                    </div>
                  </div>

                  {/* Node Title */}
                  <div className={isVisible ? "anim-fade-left" : "opacity-0"}>
                    <h3 className="font-space font-bold text-2xl md:text-3xl text-[#111827] mb-4 md:mb-5">
                      {node.title}
                    </h3>

                    {/* Sub-Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {node.cards.map((card, cardIndex) => {
                        const cardId = `card-${index}-${cardIndex}`;
                        const isHovered = hoveredCard === cardId;

                        return (
                          <div
                            key={cardId}
                            className={`group relative bg-white rounded-xl p-5 shadow-sm border border-[rgba(93,191,138,0.15)] overflow-hidden transition-all duration-500 ease-out ${isVisible ? "anim-fade-up" : "opacity-0"}`}
                            style={{
                              animationDelay: `${0.1 + cardIndex * 0.07}s`,
                              transform: isHovered
                                ? "translateY(-6px) scale(1.01)"
                                : "translateY(0) scale(1)",
                              boxShadow: isHovered
                                ? "0 20px 40px -12px rgba(93,191,138,0.25), 0 0 0 1px rgba(93,191,138,0.3)"
                                : "0 1px 3px rgba(0,0,0,0.05)",
                            }}
                            onMouseMove={(e) => handleMouseMove(cardId, e)}
                            onMouseEnter={() => setHoveredCard(cardId)}
                            onMouseLeave={() => setHoveredCard(null)}
                          >
                            {/* Bubble Effect */}
                            <div
                              className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#5DBF8A]/8 transition-all duration-500 ease-out"
                              style={{
                                transform: isHovered
                                  ? "scale(1.5)"
                                  : "scale(1)",
                                opacity: isHovered ? 1 : 0.8,
                              }}
                            />

                            {/* Directional Glow */}
                            <div
                              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                              style={{
                                opacity: isHovered ? 1 : 0,
                                background: mousePositions[cardId]
                                  ? `radial-gradient(circle at ${mousePositions[cardId].x}% ${mousePositions[cardId].y}%, rgba(93,191,138,0.2) 0%, rgba(93,191,138,0.08) 30%, transparent 60%)`
                                  : "transparent",
                              }}
                            />

                            {/* Icon */}
                            <div
                              className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-[#5DBF8A] to-[#4aa87a] flex items-center justify-center text-white mb-4 transition-all duration-300"
                              style={{
                                transform: isHovered
                                  ? "scale(1.1) rotate(5deg)"
                                  : "scale(1) rotate(0)",
                                boxShadow: isHovered
                                  ? "0 10px 25px -5px rgba(93,191,138,0.4)"
                                  : "0 4px 12px -2px rgba(93,191,138,0.2)",
                              }}
                            >
                              {card.icon}
                            </div>

                            <h4
                              className="font-space font-semibold text-lg md:text-xl text-[#111827] mb-2 transition-all duration-300 relative z-10"
                              style={{
                                color: isHovered ? "#5DBF8A" : "#111827",
                              }}
                            >
                              {card.title}
                            </h4>
                            <p className="font-poppins text-[15px] text-[#6B7280] leading-relaxed relative z-10">
                              {card.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ExpertiseSection;
