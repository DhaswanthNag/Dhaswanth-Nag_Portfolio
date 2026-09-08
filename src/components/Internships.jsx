import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const internships = [
  {
    company: 'Palo Alto Networks',
    role: 'Cybersecurity Virtual Internship',
    period: 'May to Jul 2023',
    type: 'VIRTUAL INTERNSHIP',
    code: 'CYBERSECURITY',
    summary:
      'Developed foundational knowledge of cybersecurity concepts, modern threat landscapes, network security, and security-first practices through an industry-focused virtual program.',
    skills: ['Cybersecurity', 'Network Security', 'Threat Awareness', 'Security Fundamentals'],
  },
  {
    company: 'AWS Academy',
    role: 'AI/ML Virtual Internship',
    period: 'May to Jul 2024',
    type: 'VIRTUAL INTERNSHIP',
    code: 'ARTIFICIAL INTELLIGENCE',
    summary:
      'Explored core artificial intelligence and machine learning concepts, cloud-based workflows, model fundamentals, and practical approaches to data-driven problem solving.',
    skills: ['Artificial Intelligence', 'Machine Learning', 'AWS', 'Data Fundamentals'],
  },
  {
    company: 'BIST Technologies Pvt. Ltd.',
    role: 'Artificial Intelligence & Data Science Internship',
    period: 'Feb to Apr 2025',
    type: 'INTERNSHIP & CERTIFICATION',
    code: 'DATA SCIENCE',
    summary:
      'Strengthened practical understanding of artificial intelligence and data science through structured training, technical exercises, and certification-focused project work.',
    skills: ['AI', 'Data Science', 'Data Analysis', 'Problem Solving'],
  },
];

const Internships = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(cardRefs.current, {
          opacity: 0.28,
          scale: 0.82,
          rotateY: -8,
          transformOrigin: 'center center',
        });
        gsap.set(cardRefs.current[0], { opacity: 1, scale: 1, rotateY: 0 });

        const getTravel = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, {
          x: () => -getTravel(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.max(getTravel() * 1.8, window.innerHeight * 2.6)}`,
            pin: true,
            scrub: 1.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const position = self.progress * (internships.length - 1);

              cardRefs.current.forEach((card, index) => {
                if (!card) return;
                const distance = Math.abs(index - position);

                gsap.set(card, {
                  opacity: gsap.utils.clamp(0.28, 1, 1 - distance * 0.72),
                  scale: gsap.utils.clamp(0.82, 1, 1 - distance * 0.16),
                  rotateY: gsap.utils.clamp(-8, 8, (index - position) * -8),
                });
              });

              gsap.set(progressRef.current, {
                scaleX: Math.max(0.02, self.progress),
              });
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      mm.add('(max-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const cards = cardRefs.current.filter(Boolean);
        gsap.set(cards, { opacity: 0.45, scale: 0.92, rotateY: 0, x: 0 });
        gsap.set(cards[0], { opacity: 1, scale: 1 });

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

        return () => observers.forEach((observer) => observer.kill());
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(cardRefs.current, {
          clearProps: 'all',
          opacity: 1,
          scale: 1,
          rotateY: 0,
        });
        gsap.set(progressRef.current, { scaleX: 1 });
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
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-[#E50914]">
            Academic Internships
          </p>
          <h2
            id="internships-title"
            className="text-4xl font-black tracking-[-0.04em] sm:text-5xl md:text-6xl"
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
        className="relative z-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[8vw] pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:h-full md:w-max md:items-center md:gap-[8vw] md:overflow-visible md:px-[calc(50vw-270px)] md:pb-0 md:[transform-style:preserve-3d]"
      >
        {internships.map((internship, index) => (
          <article
            key={`${internship.company}-${internship.period}`}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className="group relative flex h-[500px] w-[84vw] max-w-[540px] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#141414]/95 p-7 shadow-[0_35px_90px_rgba(0,0,0,0.75)] backdrop-blur-xl transition-colors duration-500 hover:border-[#E50914]/75 sm:p-9 md:h-[520px] md:w-[540px] md:p-10"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#E50914]/15 via-transparent to-transparent opacity-45 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#E50914] transition-transform duration-700 group-hover:scale-x-100" />
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
              <p className="text-base font-semibold text-white/90">{internship.company}</p>
              <time className="mt-1 block font-mono text-xs uppercase tracking-[0.16em] text-white/45">
                {internship.period}
              </time>
              <p className="mt-5 max-w-md text-sm font-light leading-6 text-white/60 sm:text-[15px]">
                {internship.summary}
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-2 border-t border-white/10 pt-5">
              {internship.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[10px] text-white/65 transition-colors duration-300 group-hover:border-[#E50914]/30 group-hover:text-white/85"
                >
                  {skill}
                </span>
              ))}
            </div>

            <span className="absolute bottom-5 right-5 h-2 w-2 rounded-full bg-[#E50914] shadow-[0_0_14px_#E50914]" />
          </article>
        ))}
      </div>

      {/* Desktop scroll progress */}
      <div className="absolute bottom-9 left-1/2 z-20 hidden w-[min(78vw,850px)] -translate-x-1/2 md:block">
        <div className="h-px overflow-hidden bg-white/15">
          <div
            ref={progressRef}
            className="h-full origin-left scale-x-[0.02] bg-[#E50914] shadow-[0_0_12px_rgba(229,9,20,.9)]"
          />
        </div>
        <div className="mt-3 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
          <span>Scroll to explore</span>
          <span>03 experiences</span>
        </div>
      </div>
    </section>
  );
};

export default Internships;
