import { useState, useEffect, useRef } from "react";
import { technologies } from "./TechStackData.jsx";
import "./TechStack.css";
import { CheckSquare, Wrench } from "lucide-react";

export default function TechStack() {
  const [hasIntersected, setHasIntersected] = useState(false);
  const [activeHoverIndex, setActiveHoverIndex] = useState(null);
  const [hoveredPhilosophyCard, setHoveredPhilosophyCard] = useState(null);
  const [philosophyMousePositions, setPhilosophyMousePositions] = useState({});

  const handlePhilosophyMouseMove = (cardId, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPhilosophyMousePositions((prev) => ({ ...prev, [cardId]: { x, y } }));
  };

  // Dragging / Interactive Moving Coordinates
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const elementStart = useRef({ x: 0, y: 0 });

  // Auto-Slide Drifting variables
  const autoTimeRef = useRef(0);
  const animationFrameRef = useRef(null);

  // CDN Load Statuses
  const [imageErrors, setImageErrors] = useState({});

  const sectionRef = useRef(null);
  const workspaceRef = useRef(null);

  // Constants for Infinite Grid
  const GRID_WIDTH = 5 * 180; // 5 columns * 180px gap = 900px
  const GRID_HEIGHT = 4 * 130; // 4 rows * 130px gap = 520px

  // Magic function: Wraps coordinates infinitely
  const wrapCoordinate = (val, max) => {
    const half = max / 2;
    return ((((val + half) % max) + max) % max) - half;
  };

  // Viewport Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasIntersected) {
            setHasIntersected(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, [hasIntersected]);

  // Infinite slow auto-slide movement loop
  useEffect(() => {
    const driftSpeed = 0.0008;

    const startAutoDrift = () => {
      if (isDragging || activeHoverIndex !== null) return;

      autoTimeRef.current += 1.3;

      // Changed from Absolute Target to Relative Velocity for Infinite Pan
      const velocityX = Math.cos(autoTimeRef.current * driftSpeed) * 0.3;
      const velocityY = Math.sin(autoTimeRef.current * driftSpeed * 1.4) * 0.3;

      setPanOffset((prev) => ({
        x: prev.x + velocityX,
        y: prev.y + velocityY,
      }));
    };

    const updateLoop = () => {
      startAutoDrift();
      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animationFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging, activeHoverIndex]);

  // Drag start handler
  const handleDragStart = (clientX, clientY) => {
    setIsDragging(true);
    dragStart.current = { x: clientX, y: clientY };
    elementStart.current = { x: panOffset.x, y: panOffset.y };
  };

  // Drag movement tracker (Removed Circular Limits for Infinite Pan)
  const handleDragMove = (clientX, clientY) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStart.current.x;
    const deltaY = clientY - dragStart.current.y;

    // No radius limit! Drag as far as you want.
    setPanOffset({
      x: elementStart.current.x + deltaX,
      y: elementStart.current.y + deltaY,
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Global mousemove/mouseup listener
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      handleDragMove(e.clientX, e.clientY);
    };
    const handleGlobalMouseUp = () => {
      handleDragEnd();
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, panOffset]);

  // Edge Connection Map
  const edges = [];
  for (let i = 0; i < technologies.length; i++) {
    const col = i % 5;
    const row = Math.floor(i / 5);

    if (col < 4) edges.push({ fromIdx: i, toIdx: i + 1 });
    if (row < 3) edges.push({ fromIdx: i, toIdx: i + 5 });
    if (col < 4 && row < 3) edges.push({ fromIdx: i, toIdx: i + 6 });
    if (col > 0 && row < 3) edges.push({ fromIdx: i, toIdx: i + 4 });
  }

  return (
    <section
      id="tech-stack-section"
      ref={sectionRef}
      className="relative w-full bg-[#ffffff] py-24 px-4 sm:px-8 overflow-hidden flex flex-col items-center justify-center border-t border-neutral-100/60 select-none"
    >
      {/* Background Grids & Blobs Remain Unchanged */}
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
      <div className="hero-bg-blur">
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
        <div
          className="hero-gradient-blob bg-blob-2"
          style={{
            top: "25%",
            right: "-15%",
            width: "550px",
            height: "550px",
            background:
              "radial-gradient(circle at 50% 50%, rgba(93, 191, 138, 0.4), rgba(93, 191, 138, 0.12) 40%, transparent 70%)",
          }}
        ></div>
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
        <div
          className="hero-gradient-blob bg-blob-3"
          style={{
            bottom: "-20%",
            left: "15%",
            width: "650px",
            height: "650px",
            background:
              "radial-gradient(circle at 30% 70%, rgba(93, 191, 138, 0.45), rgba(93, 191, 138, 0.1) 45%, transparent 75%)",
          }}
        ></div>
      </div>

      <div
        className={`relative z-10 w-full max-w-6xl mx-auto text-center mb-10 pointer-events-auto ${hasIntersected ? "anim-fade-up" : "opacity-0"}`}
      >
        <h2 className="font-space font-bold text-4xl md:text-5xl text-[#111827] mb-4">
          <span className="relative inline-block">
            The Standard I{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5DBF8A] to-[#4aa87a]">
              Keep
            </span>
          </span>
        </h2>
        <p className="font-poppins text-neutral-500 text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed select-none">
          Every project I take on follows the same rules. Clean code, real
          performance, and an interface that actually works for the person using
          it.
        </p>
      </div>

      <div
        ref={workspaceRef}
        id="tech-workspace-container"
        onMouseDown={(e) => {
          if (e.target.closest("button")) return;
          e.preventDefault();
          handleDragStart(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          if (e.touches.length > 0)
            handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchMove={(e) => {
          if (e.touches.length > 0)
            handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={handleDragEnd}
        className={`relative z-10 w-full max-w-6xl h-[500px] rounded-full select-none interactive-space-dots transition-all duration-800 mx-auto ${isDragging ? "cursor-grabbing" : "cursor-grab"} ${hasIntersected ? "anim-fade-up" : "opacity-0"}`}
        style={{
          animationDelay: "0.15s",
          maskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 55%, rgba(0,0,0,0.15) 85%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 55%, rgba(0,0,0,0.15) 85%, rgba(0,0,0,0) 100%)",
        }}
      >
        {/* Important: Removed transform property from this wrapper so cards pan independently */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
          <div className="relative w-[900px] h-[500px] pointer-events-auto">
            {/* SVG Lines rendering with Wrapped Coordinates */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              style={{ zIndex: 5 }}
            >
              {edges.map((edge, idx) => {
                const fromCol = edge.fromIdx % 5;
                const fromRow = Math.floor(edge.fromIdx / 5);
                const toCol = edge.toIdx % 5;
                const toRow = Math.floor(edge.toIdx / 5);

                const rawX1 = (fromCol - 2) * 180;
                const rawY1 = (fromRow - 1.5) * 130;
                const rawX2 = (toCol - 2) * 180;
                const rawY2 = (toRow - 1.5) * 130;

                // Wrap endpoints
                const wrapX1 = wrapCoordinate(rawX1 + panOffset.x, GRID_WIDTH);
                const wrapY1 = wrapCoordinate(rawY1 + panOffset.y, GRID_HEIGHT);
                const wrapX2 = wrapCoordinate(rawX2 + panOffset.x, GRID_WIDTH);
                const wrapY2 = wrapCoordinate(rawY2 + panOffset.y, GRID_HEIGHT);

                // If one point wraps to the other side, don't draw the line across the screen!
                if (
                  Math.abs(wrapX1 - wrapX2) > 200 ||
                  Math.abs(wrapY1 - wrapY2) > 150
                ) {
                  return null;
                }

                // Adjust zero-center back to SVG coords (450, 250 is center of 900x500 box)
                const x1 = wrapX1 + 450;
                const y1 = wrapY1 + 250;
                const x2 = wrapX2 + 450;
                const y2 = wrapY2 + 250;

                const midX = wrapX1;
                const midY = wrapY1;
                const dist = Math.sqrt(midX * midX + midY * midY);

                const maxRadiusLimit = 450;
                const lensCore = 120;
                let lineOpacity = 0.4;

                if (dist > lensCore) {
                  const ratio = Math.min(
                    1,
                    (dist - lensCore) / (maxRadiusLimit - lensCore),
                  );
                  lineOpacity = Math.max(0, 1 * (1 - ratio));
                }
                if (dist > maxRadiusLimit) lineOpacity = 0;

                const isHoveredEdge =
                  activeHoverIndex === edge.fromIdx ||
                  activeHoverIndex === edge.toIdx;

                return (
                  <line
                    key={`edge-${idx}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    className="neural-link-animated"
                    stroke={
                      isHoveredEdge
                        ? "rgba(93, 191, 138, 0.8)"
                        : "rgba(93, 191, 138, 0.16)"
                    }
                    strokeWidth="1"
                    strokeDasharray="4 6"
                    style={{
                      opacity: isHoveredEdge
                        ? Math.max(0.7, lineOpacity * 1.5)
                        : lineOpacity,
                      animationDelay: `${(idx % 12) * 0.25}s`,
                      transition: "stroke 0.25s ease, opacity 0.3s ease",
                    }}
                  />
                );
              })}
            </svg>

            {technologies.map((tech, index) => {
              const col = index % 5;
              const row = Math.floor(index / 5);

              const baseX = (col - 2) * 180;
              const baseY = (row - 1.5) * 130;

              // Here is the infinite wrapping magic for individual items!
              const visualX = wrapCoordinate(baseX + panOffset.x, GRID_WIDTH);
              const visualY = wrapCoordinate(baseY + panOffset.y, GRID_HEIGHT);

              const distanceFromCenter = Math.sqrt(
                visualX * visualX + visualY * visualY,
              );
              const maxRadiusLimit = 450;
              const lensCore = 120;

              let dynamicScale = 1;
              let dynamicOpacity = 1;

              if (distanceFromCenter > lensCore) {
                const ratio = Math.min(
                  1,
                  (distanceFromCenter - lensCore) / (maxRadiusLimit - lensCore),
                );
                dynamicScale = 1 - ratio * 0.75;
                dynamicOpacity = 1 - ratio * 0.95;
              }

              if (distanceFromCenter > maxRadiusLimit) {
                dynamicScale = 0.15;
                dynamicOpacity = 0;
              }

              const isAnyDimmed = activeHoverIndex !== null;
              const isThisHovered = activeHoverIndex === index;
              const finalScale = isThisHovered ? 1.14 : dynamicScale;
              const finalOpacity = isThisHovered
                ? 1.0
                : isAnyDimmed
                  ? dynamicOpacity * 0.45
                  : dynamicOpacity;
              const isInteractable = dynamicOpacity > 0.15 || isThisHovered;

              return (
                <div
                  key={tech.name}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    marginLeft: "-60px",
                    marginTop: "-50px",
                    // Item specific transform coordinates to allow infinite jumping
                    transform: `translate3d(${visualX}px, ${visualY}px, 0)`,
                    opacity: hasIntersected ? finalOpacity : 0,
                    transition: isDragging ? "none" : "opacity 0.45s ease-out",
                    zIndex: isThisHovered
                      ? 50
                      : Math.round(10 - distanceFromCenter / 40) + 10,
                    pointerEvents: isInteractable ? "auto" : "none",
                  }}
                  onMouseEnter={() =>
                    isInteractable && setActiveHoverIndex(index)
                  }
                  onMouseLeave={() => setActiveHoverIndex(null)}
                >
                  <div
                    className={`${isDragging ? "" : `animate-mini-float-${index % 5}`}`}
                    style={{ animationDelay: `${(index % 5) * 0.25}s` }}
                  >
                    <div
                      className={`relative w-[120px] h-[100px] flex flex-col justify-between items-center p-3.5 rounded-2xl border bg-white/95 backdrop-blur-[7px] transition-all duration-300 ease-out select-none ${
                        isThisHovered
                          ? "border-[#5DBF8A]/60 z-30 shadow-[0_15px_45px_rgba(93,191,138,0.22)]"
                          : "border-neutral-100/90 hover:border-[#5DBF8A]/30 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
                      }`}
                      style={{
                        transform: `scale(${finalScale})`,
                        transition:
                          "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, shadow 0.25s ease",
                      }}
                    >
                      <div className="flex-1 flex items-center justify-center w-full max-h-[55%]">
                        <img
                          src={tech.imageUrl}
                          alt={`${tech.name} icon`}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 object-contain select-none transition-transform duration-300 pointer-events-none"
                          style={{
                            filter: isThisHovered
                              ? "brightness(1.1) contrast(1.02)"
                              : "none",
                          }}
                          onError={() =>
                            setImageErrors((prev) => ({
                              ...prev,
                              [tech.name]: true,
                            }))
                          }
                        />
                      </div>
                      <div className="w-full text-center pb-0.5">
                        <span
                          className={`block font-poppins text-[11px] font-semibold tracking-wide transition-colors duration-300 pointer-events-none truncate ${isThisHovered ? "text-[#5DBF8A]" : "text-[#1F2937]"}`}
                        >
                          {tech.name}
                        </span>
                      </div>
                      <div
                        className="absolute inset-0 rounded-2xl bg-radial from-[#5DBF8A]/10 via-transparent to-transparent -z-10 transition-opacity duration-300 pointer-events-none"
                        style={{ opacity: isThisHovered ? 1 : 0 }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Philosophy Cards Section (Unchanged) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {/* Card 1 */}
        <div
          key="philosophy-card-1"
          className={`group relative bg-white rounded-xl p-6 md:p-8 shadow-sm border border-[rgba(93,191,138,0.15)] overflow-hidden transition-all duration-500 ease-out ${hasIntersected ? "anim-fade-up" : "opacity-0"}`}
          style={{
            animationDelay: "0.3s",
            transform:
              hoveredPhilosophyCard === "philosophy-card-1"
                ? "translateY(-6px) scale(1.01)"
                : "translateY(0) scale(1)",
            boxShadow:
              hoveredPhilosophyCard === "philosophy-card-1"
                ? "0 20px 40px -12px rgba(93,191,138,0.25), 0 0 0 1px rgba(93,191,138,0.3)"
                : "0 1px 3px rgba(0,0,0,0.05)",
          }}
          onMouseMove={(e) => handlePhilosophyMouseMove("philosophy-card-1", e)}
          onMouseEnter={() => setHoveredPhilosophyCard("philosophy-card-1")}
          onMouseLeave={() => setHoveredPhilosophyCard(null)}
        >
          {/* Bubble Effect */}
          <div
            className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#5DBF8A]/8 transition-all duration-500 ease-out"
            style={{
              transform:
                hoveredPhilosophyCard === "philosophy-card-1"
                  ? "scale(1.5)"
                  : "scale(1)",
              opacity: hoveredPhilosophyCard === "philosophy-card-1" ? 1 : 0.8,
            }}
          />

          {/* Directional Glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: hoveredPhilosophyCard === "philosophy-card-1" ? 1 : 0,
              background: philosophyMousePositions["philosophy-card-1"]
                ? `radial-gradient(circle at ${philosophyMousePositions["philosophy-card-1"].x}% ${philosophyMousePositions["philosophy-card-1"].y}%, rgba(93,191,138,0.2) 0%, rgba(93,191,138,0.08) 30%, transparent 60%)`
                : "transparent",
            }}
          />

          {/* Icon */}
          <div
            className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-[#5DBF8A] to-[#4aa87a] flex items-center justify-center text-white mb-4 transition-all duration-300"
            style={{
              transform:
                hoveredPhilosophyCard === "philosophy-card-1"
                  ? "scale(1.1) rotate(5deg)"
                  : "scale(1) rotate(0)",
              boxShadow:
                hoveredPhilosophyCard === "philosophy-card-1"
                  ? "0 10px 25px -5px rgba(93,191,138,0.4)"
                  : "0 4px 12px -2px rgba(93,191,138,0.2)",
            }}
          >
            <CheckSquare className="w-6 h-6" />
          </div>

          <h3
            className="font-space font-bold text-xl md:text-2xl text-[#111827] mb-3 transition-all duration-300 relative z-10"
            style={{
              color:
                hoveredPhilosophyCard === "philosophy-card-1"
                  ? "#5DBF8A"
                  : "#111827",
            }}
          >
            Code That Lasts
          </h3>
          <p className="font-poppins text-[15px] md:text-base text-[#6B7280] leading-relaxed relative z-10">
            I write with structure in mind. Every component, every function,
            every file has a reason to exist. Nothing is thrown together and
            nothing is left to clean up later.
          </p>
        </div>

        {/* Card 2 */}
        <div
          key="philosophy-card-2"
          className={`group relative bg-white rounded-xl p-6 md:p-8 shadow-sm border border-[rgba(93,191,138,0.15)] overflow-hidden transition-all duration-500 ease-out ${hasIntersected ? "anim-fade-up" : "opacity-0"}`}
          style={{
            animationDelay: "0.45s",
            transform:
              hoveredPhilosophyCard === "philosophy-card-2"
                ? "translateY(-6px) scale(1.01)"
                : "translateY(0) scale(1)",
            boxShadow:
              hoveredPhilosophyCard === "philosophy-card-2"
                ? "0 20px 40px -12px rgba(93,191,138,0.25), 0 0 0 1px rgba(93,191,138,0.3)"
                : "0 1px 3px rgba(0,0,0,0.05)",
          }}
          onMouseMove={(e) => handlePhilosophyMouseMove("philosophy-card-2", e)}
          onMouseEnter={() => setHoveredPhilosophyCard("philosophy-card-2")}
          onMouseLeave={() => setHoveredPhilosophyCard(null)}
        >
          {/* Bubble Effect */}
          <div
            className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#5DBF8A]/8 transition-all duration-500 ease-out"
            style={{
              transform:
                hoveredPhilosophyCard === "philosophy-card-2"
                  ? "scale(1.5)"
                  : "scale(1)",
              opacity: hoveredPhilosophyCard === "philosophy-card-2" ? 1 : 0.8,
            }}
          />

          {/* Directional Glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: hoveredPhilosophyCard === "philosophy-card-2" ? 1 : 0,
              background: philosophyMousePositions["philosophy-card-2"]
                ? `radial-gradient(circle at ${philosophyMousePositions["philosophy-card-2"].x}% ${philosophyMousePositions["philosophy-card-2"].y}%, rgba(93,191,138,0.2) 0%, rgba(93,191,138,0.08) 30%, transparent 60%)`
                : "transparent",
            }}
          />

          {/* Icon */}
          <div
            className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-[#5DBF8A] to-[#4aa87a] flex items-center justify-center text-white mb-4 transition-all duration-300"
            style={{
              transform:
                hoveredPhilosophyCard === "philosophy-card-2"
                  ? "scale(1.1) rotate(5deg)"
                  : "scale(1) rotate(0)",
              boxShadow:
                hoveredPhilosophyCard === "philosophy-card-2"
                  ? "0 10px 25px -5px rgba(93,191,138,0.4)"
                  : "0 4px 12px -2px rgba(93,191,138,0.2)",
            }}
          >
            <Wrench className="w-6 h-6" />
          </div>

          <h3
            className="font-space font-bold text-xl md:text-2xl text-[#111827] mb-3 transition-all duration-300 relative z-10"
            style={{
              color:
                hoveredPhilosophyCard === "philosophy-card-2"
                  ? "#5DBF8A"
                  : "#111827",
            }}
          >
            Tools With Purpose
          </h3>
          <p className="font-poppins text-[15px] md:text-base text-[#6B7280] leading-relaxed relative z-10">
            I use what the work needs, not what looks good on a resume. Every
            tool in my stack earns its place by making the product faster,
            cleaner, or easier to maintain.
          </p>
        </div>
      </div>
    </section>
  );
}
