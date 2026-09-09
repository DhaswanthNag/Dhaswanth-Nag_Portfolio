import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const internships = [
  {
    company: 'Palo Alto Networks',
    role: 'Cybersecurity Virtual Internship',
    period: 'May to July 2023',
    type: 'VIRTUAL INTERNSHIP',
    code: 'CYBERSECURITY',
    summary:
      'Developed foundational knowledge of cybersecurity concepts, modern threat landscapes, network security, and security-first practices through an industry-focused virtual program.',
    skills: ['Cybersecurity', 'Network Security', 'Threat Awareness', 'Security Fundamentals'],
    certificates: [
      {
        title: 'View Certificate',
        file: `${import.meta.env.BASE_URL}certificates/Dhaswanth-Nag-Cyber-Security-certificate.pdf`,
      },
    ],
  },
  {
    company: 'AWS Academy',
    role: 'AI/ML Virtual Internship',
    period: 'Jan to Mar 2024',
    type: 'VIRTUAL INTERNSHIP',
    code: 'ARTIFICIAL INTELLIGENCE',
    summary:
      'Explored core artificial intelligence and machine learning concepts, cloud-based workflows, model fundamentals, and practical approaches to data-driven problem solving.',
    skills: ['Artificial Intelligence', 'Machine Learning', 'AWS', 'Data Fundamentals'],
    certificates: [
      {
        title: 'View Certificate',
        file: `${import.meta.env.BASE_URL}certificates/Dhaswanth-Nag-AI-ML-certificate.pdf`,
      },
    ],
  },
  {
    company: 'BIST Technologies Pvt. Ltd.',
    role: 'Artificial Intelligence & Data Science Internship',
    period: 'Dec 2024 to Apr 2025',
    type: 'INTERNSHIP & CERTIFICATION',
    code: 'DATA SCIENCE',
    summary:
      'Strengthened practical understanding of artificial intelligence and data science through structured training, technical exercises, and certification-focused project work.',
    skills: ['AI', 'Data Science', 'Data Analysis', 'Problem Solving'],
    certificates: [
      {
        title: 'AI Certificate',
        file: `${import.meta.env.BASE_URL}certificates/BIST-Dhaswanth-AI-certificate.pdf`,
      },
      {
        title: 'Data Science Certificate',
        file: `${import.meta.env.BASE_URL}certificates/BIST-Dhaswanth-Data-Science-certificate.pdf`,
      },
    ],
  },
];

const Internships = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const cardRefs = useRef([]);

  // Tracks the currently centered mobile card
  const [activeInternshipIndex, setActiveInternshipIndex] = useState(0);

  // Controls mobile arrow direction
  const [navigationDirection, setNavigationDirection] = useState('next');

  const handleScroll = (e) => {
    if (window.innerWidth >= 769) return;

    const container = e.target;
    const center = container.scrollLeft + container.offsetWidth / 2;

    let activeIdx = 0;
    let minDiff = Infinity;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - center);

      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    setActiveInternshipIndex(activeIdx);

    // When reaching the first card, reset navigation direction to forward.
    if (activeIdx === 0) {
      setNavigationDirection('next');
    }

    const cards = cardRefs.current.filter(Boolean);

    cards.forEach((card, i) => {
      gsap.to(card, {
        opacity: i === activeIdx ? 1 : 0.45,
        scale: i === activeIdx ? 1 : 0.92,
        duration: 0.65,
        ease: 'power3.out',
        overwrite: true,
      });
    });
  };

  const handleInternshipNavigation = () => {
    if (window.innerWidth >= 769 || !trackRef.current) return;

    const container = trackRef.current;
    const currentIndex = activeInternshipIndex;

    let nextIndex;

    if (navigationDirection === 'previous') {
      // Continue moving backward.
      nextIndex = currentIndex - 1;

      // If we reach the first card, switch back to forward.
      if (nextIndex < 0) {
        setNavigationDirection('next');
        nextIndex = currentIndex + 1;
      }
    } else {
      // Move forward.
      nextIndex = currentIndex + 1;

      // At the last card, switch to backward navigation.
      if (nextIndex >= internships.length) {
        setNavigationDirection('previous');
        nextIndex = currentIndex - 1;
      }
    }

    const targetCard = cardRefs.current[nextIndex];

    if (targetCard) {
      const targetScroll =
        targetCard.offsetLeft -
        (container.offsetWidth - targetCard.offsetWidth) / 2;

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add(
        '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.set(cardRefs.current, {
            opacity: 0.28,
            scale: 0.82,
            rotateY: -8,
            transformOrigin: 'center center',
          });

          gsap.set(cardRefs.current[0], {
            opacity: 1,
            scale: 1,
            rotateY: 0,
          });

          const getTravel = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);

          const tween = gsap.to(track, {
            x: () => -getTravel(),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () =>
                `+=${Math.max(
                  getTravel() * 1.8,
                  window.innerHeight * 2.6
                )}`,
              pin: true,
              scrub: 1.8,
              invalidateOnRefresh: true,
              anticipatePin: 1,

              onUpdate: (self) => {
                const position =
                  self.progress * (internships.length - 1);

                cardRefs.current.forEach((card, index) => {
                  if (!card) return;

                  const distance = Math.abs(index - position);

                  gsap.set(card, {
                    opacity: gsap.utils.clamp(
                      0.28,
                      1,
                      1 - distance * 0.72
                    ),
                    scale: gsap.utils.clamp(
                      0.82,
                      1,
                      1 - distance * 0.16
                    ),
                    rotateY: gsap.utils.clamp(
                      -8,
                      8,
                      (index - position) * -8
                    ),
                    zIndex: Math.round(
                      100 - distance * 10
                    ),
                  });
                });

                gsap.set(progressRef.current, {
                  scaleX: Math.max(
                    0.02,
                    self.progress
                  ),
                });
              },
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        }
      );

      mm.add(
        '(max-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          const cards = cardRefs.current.filter(Boolean);

          gsap.set(cards, {
            opacity: 0.45,
            scale: 0.92,
            rotateY: 0,
            x: 0,
          });

          gsap.set(cards[0], {
            opacity: 1,
            scale: 1,
          });

          const observers = cards.map((card) => {
            const trigger = ScrollTrigger.create({
              trigger: card,
              scroller: track,
              horizontal: true,
              start: 'left 65%',
              end: 'right 35%',
              onToggle: (self) => {
                gsap.to(card, {
                  opacity: self.isActive ? 1 : 0.45,
                  scale: self.isActive ? 1 : 0.92,
                  duration: 0.65,
                  ease: 'power3.out',
                  overwrite: true,
                });
              },
            });

            return trigger;
          });

          return () =>
            observers.forEach((observer) => observer.kill());
        }
      );

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(cardRefs.current, {
          clearProps: 'all',
          opacity: 1,
          scale: 1,
          rotateY: 0,
        });

        gsap.set(progressRef.current, {
          scaleX: 1,
        });
      });
    }, section);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="internships"
      ref={sectionRef}
      aria-labelledby="internships-title"
      className="relative min-h-screen overflow-hidden bg-[#080808] py-20 text-white md:h-screen md:py-0"
    >
      {/* Cinematic background */}
      {/* Subtle red background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(229,9,20,0.10),transparent_34%),radial-gradient(circle_at_85%_75%,rgba(229,9,20,0.04),transparent_30%)]" />

      {/* Dark cinematic overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      {/* Background word */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0
                  -translate-x-1/2 -translate-y-1/2 whitespace-nowrap
                  text-[12vw] md:text-[13vw] font-black uppercase leading-none
                  tracking-[-0.05em] text-red-600/[0.025] opacity-60
                  select-none"
        style={{
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.12)',
        }}
      >
        INTERNSHIPS
      </p>

      {/* Heading */}
      <header className="relative z-20 mx-auto mb-10 flex w-full max-w-7xl items-end justify-between px-6 md:absolute md:left-1/2 md:top-10 md:mb-0 md:-translate-x-1/2 md:px-10">
        <div>
          <div className="inline-flex h-8 gap-2 sm:h-9 items-center rounded-[4px] border border-red-600/80 bg-black/35 px-3 sm:px-4 backdrop-blur-md shadow-[0_0_24px_rgba(229,9,20,0.08)]">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>

            <span className="whitespace-nowrap font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E50914]">
              EPISODE 04
            </span>

            <span className="mx-2 sm:mx-3 h-3.5 w-px bg-white/35" />

            <span className="whitespace-nowrap font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90">
              ACADEMIC INTERNSHIPS
            </span>
          </div>

          <h2
            id="internships-title"
            className="text-4xl font-black tracking-[-0.04em] sm:text-5xl md:text-4xl"
          >
            Internships<span className="text-[#E50914]">.</span>
          </h2>
        </div>

        <p className="hidden max-w-xs text-right text-sm leading-relaxed text-white/45 lg:block">
          Industry learning across security, artificial intelligence, cloud, and data science.
        </p>
      </header>

      {/* Horizontal experience track */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="relative z-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[8vw] pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:h-full md:w-max md:items-center md:gap-[8vw] md:overflow-visible md:px-[calc(50vw-270px)] md:pb-0 md:[transform-style:preserve-3d]"
      >
        {internships.map((internship, index) => (
          <article
            key={`${internship.company}-${internship.period}`}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className="group pointer-events-none relative flex h-[500px] w-[84vw] max-w-[540px] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#141414]/95 p-7 shadow-[0_35px_90px_rgba(0,0,0,0.75)] backdrop-blur-xl transition-colors duration-500 hover:border-[#E50914]/75 sm:p-9 md:h-[520px] md:w-[540px] md:p-10"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#E50914]/15 via-transparent to-transparent opacity-45 transition-opacity duration-700 group-hover:opacity-100" />

            <div className="pointer-events-none absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#E50914] transition-transform duration-700 group-hover:scale-x-100" />

            <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#E50914]/10 blur-3xl transition-all duration-700 group-hover:bg-[#E50914]/25" />

            <div className="relative z-10 flex items-start justify-between gap-4">
              <span className="rounded-full border border-[#E50914]/30 bg-[#E50914]/10 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#ff4c55]">
                {internship.type}
              </span>

              <span className="font-mono text-xs text-white/35">
                0{index + 1} / 0{internships.length}
              </span>
            </div>

            <div className="relative z-10 my-auto">
              <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#E50914]">
                {internship.code}
              </p>

              <h3 className="max-w-md text-3xl font-black leading-[1.05] tracking-[-0.035em] sm:text-4xl">
                {internship.role}
              </h3>

              <div className="my-5 h-px w-14 bg-[#E50914] transition-all duration-500 group-hover:w-24" />

              <p className="text-base font-semibold text-white/90">
                {internship.company}
              </p>

              <time className="mt-1 block font-mono text-xs uppercase tracking-[0.16em] text-white/45">
                {internship.period}
              </time>

              <p className="mt-5 max-w-md text-sm font-light leading-6 text-white/60 sm:text-[15px]">
                {internship.summary}
              </p>
            </div>

            <div className="relative z-10 mb-4 flex flex-wrap gap-2">
              {internship.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[10px] text-white/65 transition-colors duration-300 group-hover:border-[#E50914]/30 group-hover:text-white/85"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Internship Certificates */}
            <div className="pointer-events-auto relative z-[100] flex flex-row flex-nowrap gap-3 border-t border-white/10 pt-4 isolate">
              {internship.certificates.map((certificate) => (
                <a
                  key={certificate.file}
                  href={new URL(
                    certificate.file,
                    window.location.origin
                  ).href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerDown={(event) => event.stopPropagation()}
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={(event) => event.stopPropagation()}
                  className="pointer-events-auto relative z-[130] inline-flex min-h-[48px] items-center gap-2.5 rounded-lg border-2 border-[#E50914]/50 bg-[#E50914]/15 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:border-[#E50914] hover:bg-[#E50914]/25 hover:text-white hover:shadow-[0_0_24px_rgba(229,9,20,0.28)] active:scale-[0.97] cursor-pointer select-none"
                >
                  {/* Certificate / Document Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5 shrink-0 text-[#E50914]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3.75h7.5L18.75 8.25v12A1.5 1.5 0 0 1 17.25 21.75h-10.5a1.5 1.5 0 0 1-1.5-1.5v-15a1.5 1.5 0 0 1 1.5-1.5Z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.25 3.75v4.5h4.5M8.25 12h7.5M8.25 15h5.25"
                    />

                    <circle
                      cx="16.75"
                      cy="16.75"
                      r="2.25"
                    />
                  </svg>

                  {certificate.title}

                  {/* External Link Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4 shrink-0 text-white/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5h5v5M19 5l-8 8"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 13.5v3.75A1.75 1.75 0 0 1 17.25 19h-11.5A1.75 1.75 0 0 1 4 17.25v-11.5A1.75 1.75 0 0 1 5.75 4H9.5"
                    />
                  </svg>
                </a>
              ))}
            </div>

            <span className="pointer-events-none absolute bottom-5 right-5 h-2 w-2 rounded-full bg-[#E50914] shadow-[0_0_14px_#E50914]" />
          </article>
        ))}
      </div>

      {/* Mobile Navigation Arrow */}
      <button
        type="button"
        aria-label={
          navigationDirection === 'previous'
            ? 'Swipe to previous internship'
            : 'Swipe to next internship'
        }
        onClick={handleInternshipNavigation}
        className="absolute right-5 top-1/2 z-[300] flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#E50914]/70 bg-black/75 text-white shadow-[0_0_30px_rgba(229,9,20,0.35)] backdrop-blur-md transition-all duration-300 hover:border-[#E50914] hover:bg-[#E50914]/20 hover:shadow-[0_0_40px_rgba(229,9,20,0.5)] active:scale-90 md:hidden"
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
                ? 'M19 12H5M11 18l-6-6 6-6'
                : 'M5 12h14M13 6l6 6-6 6'
            }
          />
        </svg>
      </button>

      {/* Desktop scroll progress */}
      <div className="pointer-events-none absolute bottom-9 left-1/2 z-20 hidden w-[min(78vw,850px)] -translate-x-1/2 md:block">
        <div className="h-px overflow-hidden bg-white/15">
          <div
            ref={progressRef}
            className="h-full origin-left scale-x-[0.02] bg-[#E50914] shadow-[0_0_12px_rgba(229,9,20,.9)]"
          />
        </div>

        <div className="mt-3 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
          <span>Scroll to explore</span>
          <span>03 Internships</span>
        </div>
      </div>
    </section>
  );
};

export default Internships;