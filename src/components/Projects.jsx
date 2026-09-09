import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Authentic Project Data based on your engineering portfolio
const projectsData = [
  {
    title: "Human Resource Management System",
    category: "Full-Stack Application",
    description:
      "A comprehensive HR management platform designed to streamline employee operations, recruitment workflows, leave management, and document generation.",
    tags: ["Node.js", "React.js", "PostgreSQL", "Tailwind CSS"],
    match: "99%",
    episode: "S05 E01"
  },
  {
    title: "Hospital Appointment Management System",
    category: "Healthcare Application",
    description:
      "A web-based solution for managing patient appointments, doctor schedules, and booking workflows through an organized and user-friendly interface.",
    tags: ["Spring Boot", "JWT", "React.js", "PostgreSQL", "Tailwind CSS"],
    match: "98%",
    episode: "S05 E02"
  },
  {
    title: "Web Vulnerability Detection using ML",
    category: "Machine Learning Application",
    description:
      "A machine learning-based system designed to detect common web vulnerabilities and improve the efficiency of vulnerability identification and reporting.",
    tags: ["Python", "Scikit-learn", "SQL", "Machine Learning"],
    match: "97%",
    episode: "S05 E03"
  },
  {
    title: "Payslip & Document Generator",
    category: "Automation & Productivity",
    description:
      "An automated document generation system for creating professional payslips and downloadable employee documents with support for bulk processing.",
    tags: ["React.js", "jsPDF", "Excel", "JSZip"],
    match: "97%",
    episode: "S05 E04"
  },
  {
    title: "Rock Paper Scissors Game",
    category: "Interactive Web Application",
    description:
      "A responsive browser-based game featuring interactive gameplay, real-time score tracking, and a clean user experience.",
    tags: ["JavaScript", "HTML5", "CSS3", "DOM"],
    match: "95%",
    episode: "S05 E05"
  },
  {
    title: "Developer Portfolio",
    category: "Personal Portfolio",
    description:
      "A cinematic developer portfolio designed to showcase professional experience, projects, achievements, and technical capabilities through an interactive interface.",
    tags: ["React.js", "Tailwind CSS", "Framer Motion", "JavaScript"],
    match: "100%",
    episode: "S05 E06"
  },
  {
    title: "Cloud Deployment & CI/CD",
    category: "Cloud & Deployment",
    description:
      "A practical deployment workflow focused on version control, application delivery, and hosting through modern cloud platforms.",
    tags: ["Git", "GitHub", "AWS", "Vercel"],
    match: "98%",
    episode: "S05 E07"
  },
  {
    title: "Community Service Project — Air Pollution Awareness",
    category: "Community Service Project",
    description:
      "A community-focused project involving a socio-economic survey and awareness activities to educate people about air pollution and its impact on the environment and public well-being.",
    tags: ["Survey", "Research", "Community Service", "Awareness"],
    match: "96%",
    episode: "S05 E08"
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);

  // Tracks the currently centered mobile project card
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  // Controls mobile navigation direction
  const [navigationDirection, setNavigationDirection] = useState('next');

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial origins (Centered in viewport)
      gsap.set([folderBackRef.current, folderFrontRef.current], {
        xPercent: -50,
        yPercent: -50
      });

      gsap.set(folderFrontRef.current, {
        transformOrigin: "bottom center"
      });

      const getGridPos = (index) => {
        let row, col;

        if (index < 3) {
          row = 0;
          col = index;
        } else if (index === 3) {
          row = 1;
          col = 0;
        } else if (index === 4) {
          row = 1;
          col = 2;
        } else {
          row = 2;
          col = index - 5;
        }

        return { row, col };
      };

      cardsRef.current.forEach((card) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0
        });
      });

      let mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)"
        },
        (context) => {
          let { isDesktop, isMobile } = context.conditions;

          if (isDesktop) {
            let floatTween;

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 50%",
                end: "bottom 50%",
                toggleActions: "play reverse play reverse",
                onEnter: () => {
                  if (floatTween) floatTween.kill();
                },
                onEnterBack: () => {
                  if (floatTween) floatTween.kill();
                },
                onLeave: () => {
                  if (floatTween) floatTween.kill();
                },
                onLeaveBack: () => {
                  if (floatTween) floatTween.kill();
                }
              },

              onComplete: () => {
                floatTween = gsap.to(cardsRef.current, {
                  y: "+=12",
                  rotation: "+=1",
                  duration: 3.5,
                  yoyo: true,
                  repeat: -1,
                  ease: "sine.inOut",
                  stagger: {
                    amount: 1.5,
                    from: "random"
                  }
                });
              }
            });

            // 1. Folder opens with smooth rotation
            tl.to(folderFrontRef.current, {
              rotationX: -130,
              duration: 1.2,
              ease: "power3.inOut"
            });

            // 2. Cards rise up collectively
            tl.to(
              cardsRef.current,
              {
                y: -140,
                scale: 0.9,
                zIndex: 70,
                duration: 0.6,
                stagger: 0.04,
                ease: "back.out(1.2)"
              },
              "-=0.6"
            );

            // 3. Cards magically spread out into an ultra-clean blockbuster grid layout
            tl.to(
              cardsRef.current,
              {
                x: (i) => {
                  const w =
                    Math.max(
                      ...cardsRef.current.map(
                        (c) => c?.offsetWidth || 0
                      )
                    ) || 360;

                  const gap = 40;
                  const { col } = getGridPos(i);

                  return (col - 1) * (w + gap);
                },

                y: (i) => {
                  const h =
                    Math.max(
                      ...cardsRef.current.map(
                        (c) => c?.offsetHeight || 0
                      )
                    ) || 240;

                  const gap = 40;
                  const { row } = getGridPos(i);

                  return (row - 1) * (h + gap);
                },

                rotation: () => gsap.utils.random(-3, 3),
                scale: 1,
                duration: 1.4,
                stagger: {
                  amount: 0.4,
                  from: "center"
                },
                ease: "expo.out"
              },
              "-=0.2"
            );
          }

          if (isMobile) {
            const cardW = window.innerWidth * 0.8;
            const gap = 20;

            mobileCardsRef.current.forEach((card, i) => {
              gsap.set(card, {
                x: -(i * (cardW + gap)),
                y: 0,
                scale: 0.4,
                opacity: 0,
                rotation: gsap.utils.random(-15, 15)
              });
            });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%"
              }
            });

            tl.to(folderFrontRef.current, {
              rotationX: -130,
              duration: 0.8,
              ease: "power3.inOut"
            });

            tl.to(
              mobileCardsRef.current,
              {
                y: -100,
                opacity: 1,
                scale: 0.85,
                duration: 0.6,
                stagger: 0.05,
                ease: "back.out(1.2)"
              },
              "-=0.4"
            );

            tl.to(
              mobileCardsRef.current,
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: (i) => (i === 0 ? 1 : 0.92),
                opacity: (i) => (i === 0 ? 1 : 0.6),
                duration: 0.8,
                stagger: 0.08,
                ease: "expo.out",

                onComplete: () => {
                  if (mobileCarouselRef.current) {
                    mobileCarouselRef.current.style.overflowX = "auto";
                    mobileCarouselRef.current.style.pointerEvents = "auto";
                  }
                }
              },
              "-=0.2"
            );
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Briefly pauses scrolling (both directions) the moment the visitor
  // reaches the Projects section, so it doesn't fly past unnoticed.
  // After the short pause, scrolling resumes at completely normal speed.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let isPaused = false;
    const PAUSE_DURATION = 1000; // milliseconds (~0.5–1s pause requested)

    const blockScrollWhilePaused = (e) => {
      if (isPaused) e.preventDefault();
    };

    const triggerPause = () => {
      if (isPaused) return;

      isPaused = true;

      window.setTimeout(() => {
        isPaused = false;
      }, PAUSE_DURATION);
    };

    // Fires once when the section is reached scrolling down,
    // and once again when it's reached scrolling back up.
    const pauseTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top center",
      onEnter: triggerPause,
      onEnterBack: triggerPause
    });

    window.addEventListener("wheel", blockScrollWhilePaused, {
      passive: false
    });

    window.addEventListener("touchmove", blockScrollWhilePaused, {
      passive: false
    });

    return () => {
      window.removeEventListener("wheel", blockScrollWhilePaused);
      window.removeEventListener("touchmove", blockScrollWhilePaused);
      pauseTrigger.kill();
    };
  }, []);

  // Keeps the mobile carousel readable: as the visitor swipes, whichever
  // card sits nearest the center becomes fully visible/full-scale, while
  // neighboring cards dim and shrink proportionally to their distance —
  // so each project is clearly viewable one at a time.
  useEffect(() => {
    const carousel = mobileCarouselRef.current;
    if (!carousel) return;

    const updateMobileCardFocus = () => {
      const containerCenter =
        carousel.scrollLeft + carousel.offsetWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      mobileCardsRef.current.forEach((card, index) => {
        if (!card) return;

        const cardCenter =
          card.offsetLeft + card.offsetWidth / 2;

        const distance = Math.abs(
          containerCenter - cardCenter
        );

        // Track the card closest to the center
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }

        const maxDistance = card.offsetWidth * 1.1;

        const proximity = gsap.utils.clamp(
          0,
          1,
          1 - distance / maxDistance
        );

        gsap.to(card, {
          opacity: gsap.utils.mapRange(
            0,
            1,
            0.55,
            1,
            proximity
          ),

          scale: gsap.utils.mapRange(
            0,
            1,
            0.9,
            1,
            proximity
          ),

          duration: 0.25,
          ease: "power1.out",
          overwrite: "auto"
        });
      });

      setActiveProjectIndex(closestIndex);

      // Only reset direction at the first card.
      // This prevents 8 → 7 from changing the arrow back to →.
      if (closestIndex === 0) {
        setNavigationDirection('next');
      }
    };

    carousel.addEventListener(
      "scroll",
      updateMobileCardFocus,
      {
        passive: true
      }
    );

    // Set initial active card
    updateMobileCardFocus();

    return () =>
      carousel.removeEventListener(
        "scroll",
        updateMobileCardFocus
      );
  }, []);

  // Mobile project navigation
  const handleProjectNavigation = () => {
    if (
      window.innerWidth >= 768 ||
      !mobileCarouselRef.current
    ) {
      return;
    }

    const carousel = mobileCarouselRef.current;
    const currentIndex = activeProjectIndex;

    let nextIndex;

    if (navigationDirection === 'previous') {
      // Continue moving backward
      nextIndex = currentIndex - 1;

      // If we reach the first card, switch back to forward navigation
      if (nextIndex < 0) {
        setNavigationDirection('next');
        nextIndex = currentIndex + 1;
      }
    } else {
      // Move forward
      nextIndex = currentIndex + 1;

      // At the last project, switch to backward navigation
      if (nextIndex >= projectsData.length) {
        setNavigationDirection('previous');
        nextIndex = currentIndex - 1;
      }
    }

    const targetCard = mobileCardsRef.current[nextIndex];

    if (targetCard) {
      const targetScroll =
        targetCard.offsetLeft -
        (carousel.offsetWidth - targetCard.offsetWidth) / 2;

      carousel.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="bg-[#0b0b0b] min-h-[100svh] md:min-h-[170vh] relative font-sans overflow-x-clip text-white w-full flex items-center justify-center py-24 md:py-40 select-none"
    >
      <div className="absolute top-5 left-4 sm:top-7 sm:left-7 md:top-8 md:left-10 lg:left-16 z-[200] pointer-events-none">
        <div className="inline-flex h-8 gap-2 sm:h-9 items-center rounded-[4px] border border-red-600/80 bg-black/35 px-3 sm:px-4 backdrop-blur-md shadow-[0_0_24px_rgba(229,9,20,0.08)]">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>

          <span className="whitespace-nowrap font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E50914]">
            EPISODE 05
          </span>

          <span className="mx-2 sm:mx-3 h-3.5 w-px bg-white/35" />

          <span className="whitespace-nowrap font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90">
            PROJECTS
          </span>
        </div>
      </div>

      {/* Background Netflix Cinematic Title Watermark */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          PROJECTS
        </h1>
      </div>

      {/* Ambient Crimson Glow behind folder */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Perspective Container */}
      <div className="mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-[2000px] z-10">

        {/* Origin Container */}
        <div className="relative w-0 h-0 transform-style-3d">

          {/* Folder Back */}
          <div
            ref={folderBackRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#141414] rounded-[24px] border border-red-600/40 shadow-[0_20px_50px_rgba(229,9,20,0.25)] flex items-center justify-center"
            style={{ zIndex: 5 }}
          >
            <div className="absolute -top-6 left-6 w-32 h-8 bg-[#1f1f1f] rounded-t-xl border-t border-red-600/30" />

            <div className="relative z-10 text-red-600 font-mono font-black text-2xl tracking-widest uppercase opacity-60">
              ARCHIVE_SLOTS
            </div>
          </div>

          {/* Desktop Project Cards */}
          {projectsData.map((project, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="hidden md:block absolute w-[80vw] md:w-[33vw] max-w-[380px] aspect-[16/10] will-change-transform"
              style={{ zIndex: 10 + i }}
            >
              <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414]/95 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 group hover:scale-[1.04] hover:border-red-600 hover:shadow-[0_35px_80px_rgba(229,9,20,0.35)] hover:-translate-y-2 cursor-pointer relative z-10 p-7 flex flex-col justify-between">

                {/* Top Card Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-2.5 py-1 rounded border border-red-600/20">
                    {project.episode}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-red-400 font-bold">
                      {project.match} Match
                    </span>

                    <span className="text-[10px] font-mono border border-white/30 px-1 text-white/70">
                      HD
                    </span>
                  </div>
                </div>

                {/* Middle Title & Description */}
                <div className="space-y-2 my-auto">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                    {project.category}
                  </div>

                  <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-0.5 rounded group-hover:border-red-600/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Red Glowing Corner Accent */}
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />
              </div>
            </div>
          ))}

          {/* Folder Front Flap */}
          <div
            ref={folderFrontRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-[#1c1c1c] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.8)] flex flex-col justify-end p-6 border-t border-red-600/40">
              <div className="w-20 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Swipeable Carousel */}
      <div
        ref={mobileCarouselRef}
        className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-auto py-12 flex items-center gap-6 px-[12.5vw] pointer-events-none z-[100] snap-x snap-mandatory overflow-x-hidden hide-scrollbar"
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {projectsData.map((project, i) => (
          <div
            key={`mob-${i}`}
            ref={(el) => (mobileCardsRef.current[i] = el)}
            className="shrink-0 w-[78vw] aspect-[16/11] snap-center will-change-transform relative z-10"
          >
            <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414] p-6 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.9)]">

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-red-500 bg-red-600/10 px-2 py-0.5 rounded">
                  {project.episode}
                </span>

                <span className="text-xs font-mono text-red-400 font-bold">
                  {project.match} Match
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">
                  {project.title}
                </h3>

                <p className="text-xs text-white/70 font-light line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">
                {project.tags.slice(0, 3).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Mobile Navigation Arrow */}
      <button
        type="button"
        aria-label={
          navigationDirection === 'previous'
            ? 'Swipe to previous project'
            : 'Swipe to next project'
        }
        onClick={handleProjectNavigation}
        className="absolute right-5 top-1/2 z-[300] flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border-2 border-red-600/70 bg-black/75 text-white shadow-[0_0_30px_rgba(229,9,20,0.35)] backdrop-blur-md transition-all duration-300 hover:border-red-500 hover:bg-red-600/20 hover:shadow-[0_0_40px_rgba(229,9,20,0.5)] active:scale-90 md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="h-8 w-8 animate-pulse"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={
              navigationDirection === 'previous'
                ? "M19 12H5M11 18l-6-6 6-6"
                : "M5 12h14M13 6l6 6-6 6"
            }
          />
        </svg>
      </button>
    </section>
  );
};

export default Projects;