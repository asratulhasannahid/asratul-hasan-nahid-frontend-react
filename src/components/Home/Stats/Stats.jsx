import { useState, useEffect, useRef } from "react";

export default function Stats() {
  const [hasIntersected, setHasIntersected] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const sectionRef = useRef(null);
  const animationStarted = useRef(false);
  const [mousePositions, setMousePositions] = useState([
    { x: 50, y: 50 },
    { x: 50, y: 50 },
    { x: 50, y: 50 },
    { x: 50, y: 50 },
  ]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasIntersected) {
            setHasIntersected(true);
          }
        });
      },
      { threshold: 0.15 },
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasIntersected]);

  useEffect(() => {
    if (hasIntersected && !animationStarted.current) {
      animationStarted.current = true;
      const duration = 1500;
      const startTimestamp = performance.now();

      const step = (now) => {
        const elapsed = now - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        setCounts([
          Math.floor(easeProgress * 2),
          Math.floor(easeProgress * 115),
          Math.floor(easeProgress * 500),
          Math.floor(easeProgress * 96),
        ]);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCounts([2, 115, 500, 96]);
        }
      };

      requestAnimationFrame(step);
    }
  }, [hasIntersected]);

  const handleMouseMove = (index, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePositions((prev) => {
      const newPositions = [...prev];
      newPositions[index] = { x, y };
      return newPositions;
    });
  };

  const cardData = [
    {
      id: "stat-card-experience",
      count: counts[0],
      suffix: "+",
      title: "Years Of Experience",
      description:
        "Enough time to get good at the craft and know what actually matters in a codebase.",
      delay: 100,
    },
    {
      id: "stat-card-projects",
      count: counts[1],
      suffix: "+",
      title: "Projects Delivered",
      description:
        "Each one shipped with intention, not just to add a number to this list.",
      delay: 200,
    },
    {
      id: "stat-card-gmv",
      count: counts[2],
      prefix: "$",
      suffix: "K",
      title: "Combined GMV",
      description:
        "Real business value moved through interfaces I helped design and build.",
      delay: 300,
    },
    {
      id: "stat-card-delivery",
      count: counts[3],
      suffix: "%",
      title: "On-Time Delivery",
      description:
        "Every deadline met. Not because it was easy, but because reliability is non-negotiable.",
      delay: 400,
    },
  ];

  return (
    <section
      id="stats-section"
      ref={sectionRef}
      className="relative w-full bg-[#ffffff] py-24 px-6 sm:px-12 md:px-16 overflow-hidden flex flex-col items-center justify-center border-t border-neutral-100"
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

      {/* Fancy Section Header */}
      <div className="relative z-10 w-full max-w-7xl mx-auto text-center mb-12 sm:mb-12">
        <h2
          className={`font-space font-bold text-4xl sm:text-5xl md:text-6xl text-[#111827] leading-tight tracking-tight mb-3 transition-all duration-800 transform ${
            hasIntersected
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          Results That{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5DBF8A] to-[#4aa87a]">
            Speak
          </span>
        </h2>
        <p
          className={`font-poppins text-base sm:text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed transition-all duration-800 delay-150 transform ${
            hasIntersected
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          Numbers from real projects, built with{" "}
          <span className="text-[#5DBF8A] font-semibold">care</span> and
          delivered with{" "}
          <span className="text-[#5DBF8A] font-semibold">consistency</span>.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
        {cardData.map((card, index) => (
          <div
            key={card.id}
            id={card.id}
            className={`group relative rounded-2xl p-6 sm:p-8 border border-[#5DBF8A]/15 bg-white backdrop-blur-md shadow-md transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-xl hover:border-[#5DBF8A]/30 overflow-hidden ${
              hasIntersected
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{
              transitionDelay: hasIntersected ? `${card.delay}ms` : "0ms",
            }}
            onMouseMove={(e) => handleMouseMove(index, e)}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Bubble Effect */}
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#5DBF8A]/10 transition-all duration-500 ease-out group-hover:w-48 group-hover:h-48 group-hover:-right-12 group-hover:-top-12" />

            {/* Directional Glow Effect */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: hoveredCard === index ? 1 : 0,
                background: `radial-gradient(circle at ${mousePositions[index].x}% ${mousePositions[index].y}%, rgba(93, 191, 138, 0.2) 0%, rgba(93, 191, 138, 0.1) 30%, transparent 70%)`,
              }}
            />

            {/* Stat count */}
            <div className="font-space font-bold text-5xl sm:text-5xl text-[#111827] mt-3 group-hover:text-[#5DBF8A] transition-colors duration-300 relative z-10">
              {card.prefix && (
                <span className="text-[#5DBF8A] group-hover:text-[#5DBF8A]/90 transition-colors duration-300">
                  {card.prefix}
                </span>
              )}
              {card.count}
              <span className="text-[#5DBF8A] group-hover:text-[#5DBF8A] transition-colors duration-300">
                {card.suffix}
              </span>
            </div>

            <p className="font-poppins font-semibold text-xs tracking-wider uppercase text-[#5DBF8A] mt-3 pb-2 border-b border-neutral-100 relative z-10">
              {card.title}
            </p>

            <p className="font-poppins font-light text-sm text-[#6B7280] mt-4 leading-relaxed relative z-10">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
