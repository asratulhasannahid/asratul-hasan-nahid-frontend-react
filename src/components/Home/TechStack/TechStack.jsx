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

  // Viewport Intersection Observer for entering viewport
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
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [hasIntersected]);

  // Infinite slow auto-slide movement loop when not dragging or hovering
  useEffect(() => {
    const driftSpeed = 0.0008; // Ultra slow majestic float speed
    const amplitudeX = 140; // Horizontal auto drift range
    const amplitudeY = 90; // Vertical auto drift range

    const startAutoDrift = () => {
      if (isDragging || activeHoverIndex !== null) {
        return;
      }
      autoTimeRef.current += 1.3;

      // Calculate dynamic automatic cosmic hover pan coordinates
      const targetAutoX =
        Math.sin(autoTimeRef.current * driftSpeed) * amplitudeX;
      const targetAutoY =
        Math.cos(autoTimeRef.current * driftSpeed * 1.4) * amplitudeY;

      setPanOffset((prev) => ({
        x: prev.x + (targetAutoX - prev.x) * 0.02,
        y: prev.y + (targetAutoY - prev.y) * 0.02,
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

  // Drag start handler - Mouse or Touch
  const handleDragStart = (clientX, clientY) => {
    setIsDragging(true);
    dragStart.current = { x: clientX, y: clientY };
    elementStart.current = { x: panOffset.x, y: panOffset.y };
  };

  // Drag movement tracker with smooth spherical limits
  const handleDragMove = (clientX, clientY) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStart.current.x;
    const deltaY = clientY - dragStart.current.y;

    const limitRadius = 550;
    let targetX = elementStart.current.x + deltaX;
    let targetY = elementStart.current.y + deltaY;

    // Constrain inside smooth circular outer bounds
    const dist = Math.sqrt(targetX * targetX + targetY * targetY);
    if (dist > limitRadius) {
      const angle = Math.atan2(targetY, targetX);
      targetX = Math.cos(angle) * limitRadius;
      targetY = Math.sin(angle) * limitRadius;
    }

    setPanOffset({ x: targetX, y: targetY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Global mousemove/mouseup listener for perfect window-drag tracking
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

  const handleRecenter = () => {
    setPanOffset({ x: 0, y: 0 });
    autoTimeRef.current = 0;
  };

  // Dynamic mesh grid coordinates calculation (connect horizontal, vertical, and diagonals)
  const edges = [];
  for (let i = 0; i < technologies.length; i++) {
    const col = i % 5;
    const row = Math.floor(i / 5);

    // Right neighbor connection
    if (col < 4) {
      edges.push({ fromIdx: i, toIdx: i + 1 });
    }
    // Bottom neighbor connection
    if (row < 3) {
      edges.push({ fromIdx: i, toIdx: i + 5 });
    }
    // Diagonal bottom-right connection
    if (col < 4 && row < 3) {
      edges.push({ fromIdx: i, toIdx: i + 6 });
    }
    // Diagonal bottom-left connection
    if (col > 0 && row < 3) {
      edges.push({ fromIdx: i, toIdx: i + 4 });
    }
  }

  return (
    <section
      id="tech-stack-section"
      ref={sectionRef}
      className="relative w-full bg-[#ffffff] py-24 px-4 sm:px-8 overflow-hidden flex flex-col items-center justify-center border-t border-neutral-100/60 select-none"
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

      {/* Section Header */}
      <div
        className={`relative z-10 w-full max-w-6xl mx-auto text-center mb-10 pointer-events-auto ${
          hasIntersected ? "animate-tech-header" : "opacity-0"
        }`}
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

      {/* 
        Interactive Cosmic Sphere Viewport
        - Clean pure background with circular layout fading.
        - Circular viewport mask so cards emerge from depth of the outer circle gracefully.
      */}
      <div
        ref={workspaceRef}
        id="tech-workspace-container"
        onMouseDown={(e) => {
          if (e.target.closest("button")) return;
          e.preventDefault();
          handleDragStart(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          if (e.touches.length > 0) {
            handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onTouchMove={(e) => {
          if (e.touches.length > 0) {
            handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onTouchEnd={handleDragEnd}
        className={`relative z-10 w-full max-w-6xl h-[500px] rounded-full select-none interactive-space-dots transition-shadow duration-300 mx-auto ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          maskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 55%, rgba(0,0,0,0.15) 85%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 55%, rgba(0,0,0,0.15) 85%, rgba(0,0,0,0) 100%)",
        }}
      >
        {/* Infinite dynamic panned canvas panel */}
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
          style={{
            transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0)`,
            transition: isDragging
              ? "none"
              : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Spatial placements map of all 20 technologies */}
          <div className="relative w-[900px] h-[500px] pointer-events-auto">
            {/* Interactive Grid Connection Lines Vector Map Layer */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible transition-colors duration-300"
              style={{ zIndex: 5 }}
            >
              {edges.map((edge, idx) => {
                const fromCol = edge.fromIdx % 5;
                const fromRow = Math.floor(edge.fromIdx / 5);
                const toCol = edge.toIdx % 5;
                const toRow = Math.floor(edge.toIdx / 5);

                const x1 = (fromCol - 2) * 180 + 450;
                const y1 = (fromRow - 1.5) * 130 + 250;
                const x2 = (toCol - 2) * 180 + 450;
                const y2 = (toRow - 1.5) * 130 + 250;

                // Dynamic calculations of distance for each endpoint to calculate active network opacities
                // This ensures connections fade out simultaneously with the sphere edge cards!
                const midX = (x1 + x2) / 2 - 450 + panOffset.x;
                const midY = (y1 + y2) / 2 - 250 + panOffset.y;
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
                if (dist > maxRadiusLimit) {
                  lineOpacity = 0;
                }

                // Node Hover Highlight - When either endpoints of this edge is hovered!
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
              // Row and Column coordinates spread across high-density spherical orbits
              const col = index % 5;
              const row = Math.floor(index / 5);

              // Spacing offsets representing natural grid cells
              const baseX = (col - 2) * 180;
              const baseY = (row - 1.5) * 130;

              // Calculate distance to viewport center in real time
              const visualX = baseX + panOffset.x;
              const visualY = baseY + panOffset.y;
              const distanceFromCenter = Math.sqrt(
                visualX * visualX + visualY * visualY,
              );

              // Circular spherical lens scaling transitions:
              // At center (0 - 120px radius): Full standard size.
              // Toward outer borders (120px - 450px radius): Scales down to tiny as it fades backwards.
              // Over 450px radius: Fully invisible & non-interactive (behind-the-scenes).
              const maxRadiusLimit = 450;
              const lensCore = 120;

              let dynamicScale = 1;
              let dynamicOpacity = 1;

              if (distanceFromCenter > lensCore) {
                const ratio = Math.min(
                  1,
                  (distanceFromCenter - lensCore) / (maxRadiusLimit - lensCore),
                );
                dynamicScale = 1 - ratio * 0.75; // down to 0.25 scale
                dynamicOpacity = 1 - ratio * 0.95; // down to 0.05 opacity
              }

              // Fully hide if beyond limits
              if (distanceFromCenter > maxRadiusLimit) {
                dynamicScale = 0.15;
                dynamicOpacity = 0;
              }

              const isAnyDimmed = activeHoverIndex !== null;
              const isThisHovered = activeHoverIndex === index;
              const hasImageError = imageErrors[tech.name];

              const floatClass = `animate-mini-float-${index % 5}`;
              const delayIncr = index * 0.035;

              // Hover magnification settings
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
                    marginLeft: "-60px", // Half of box width (120px)
                    marginTop: "-50px", // Half of new box height (100px)
                    transform: `translate3d(${baseX}px, ${baseY}px, 0)`,
                    opacity: hasIntersected ? finalOpacity : 0,
                    transition: isDragging
                      ? "opacity 0.25s ease-out"
                      : "opacity 0.45s ease-out",
                    zIndex: isThisHovered
                      ? 50
                      : Math.round(10 - distanceFromCenter / 40) + 10,
                    pointerEvents: isInteractable ? "auto" : "none",
                  }}
                  onMouseEnter={() => {
                    if (isInteractable) setActiveHoverIndex(index);
                  }}
                  onMouseLeave={() => {
                    setActiveHoverIndex(null);
                  }}
                >
                  {/* Floating rhythmic float movement */}
                  <div
                    className={`${isDragging ? "" : floatClass}`}
                    style={{
                      animationDelay: `${(index % 5) * 0.25}s`,
                    }}
                  >
                    {/* 
                      Rectangular Tech Skill Box (EXACTLY 120px x 100px) 
                      - Border-left accent line completely removed.
                      - Extra-soft deeply blurred green shadows.
                    */}
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
                      {/* Top Skill Logo Brand Image */}
                      <div className="flex-1 flex items-center justify-center w-full max-h-[55%]">
                        {
                          <img
                            src={tech.imageUrl}
                            alt={`${tech.name} icon`}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-contain select-none transition-transform duration-300 pointer-events-none animate-none"
                            style={{
                              filter: isThisHovered
                                ? "brightness(1.1) contrast(1.02)"
                                : "none",
                            }}
                            onError={() => {
                              setImageErrors((prev) => ({
                                ...prev,
                                [tech.name]: true,
                              }));
                            }}
                          />
                        }
                      </div>

                      {/* Bottom Text Name */}
                      <div className="w-full text-center pb-0.5">
                        <span
                          className={`block font-poppins text-[11px] font-semibold tracking-wide transition-colors duration-300 pointer-events-none truncate ${
                            isThisHovered ? "text-[#5DBF8A]" : "text-[#1F2937]"
                          }`}
                        >
                          {tech.name}
                        </span>
                      </div>

                      {/* Hover subtle radial glow */}
                      <div
                        className="absolute inset-0 rounded-2xl bg-radial from-[#5DBF8A]/10 via-transparent to-transparent -z-10 transition-opacity duration-300 pointer-events-none"
                        style={{
                          opacity: isThisHovered ? 1 : 0,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Philosophy Cards */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {/* Card 1 */}
        <div
          key="philosophy-card-1"
          className="group relative bg-white rounded-xl p-6 md:p-8 shadow-sm border border-[rgba(93,191,138,0.15)] overflow-hidden transition-all duration-500 ease-out"
          style={{
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
          className="group relative bg-white rounded-xl p-6 md:p-8 shadow-sm border border-[rgba(93,191,138,0.15)] overflow-hidden transition-all duration-500 ease-out"
          style={{
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
