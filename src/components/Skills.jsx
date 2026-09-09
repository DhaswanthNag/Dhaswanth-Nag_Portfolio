import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Frontend Engineering',
    desc: 'Building responsive and engaging web interfaces with a focus on usability, accessibility, performance, and visual consistency.',
    tag: 'INTERFACE ENGINEERING',
    skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS']
  },

  {
    title: 'Backend Engineering',
    desc: 'Developing reliable server-side applications with structured APIs, business logic, authentication, and efficient data management.',
    tag: 'SERVER & DATA',
    skills: ['Node.js', 'Express.js', 'Java', 'Spring Boot', 'REST APIs']
  },

  {
    title: 'Database Management',
    desc: 'Designing and working with structured data solutions while maintaining data integrity, efficient queries, and reliable application access.',
    tag: 'DATA ENGINEERING',
    skills: ['SQL', 'PostgreSQL', 'Database Design', 'Queries']
  },

  {
    title: 'Cloud & Deployment',
    desc: 'Understanding modern cloud environments and deployment workflows for delivering applications reliably and efficiently.',
    tag: 'CLOUD & DELIVERY',
    skills: ['AWS', 'Git', 'GitHub', 'Deployment', 'Cloud Fundamentals']
  },

  {
    title: 'Problem Solving',
    desc: 'Applying analytical thinking and structured approaches to break down technical challenges and develop efficient solutions.',
    tag: 'LOGIC & OPTIMIZATION',
    skills: ['Data Structures', 'Algorithms', 'Problem Solving', 'Debugging']
  },

  {
    title: 'Development & Deployment',
    desc: 'Using modern development workflows and deployment platforms to build, manage, and deliver applications efficiently.',
    tag: 'DEVELOPER WORKFLOW',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'NPM', 'Vercel', 'Railway']
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);
  const carouselRef = useRef(null);

  const [activeSkillIndex, setActiveSkillIndex] = useState(0);

  // Controls the direction of the mobile navigation arrow
  const [navigationDirection, setNavigationDirection] = useState('next');

  const handleScroll = (e) => {
    if (window.innerWidth >= 769) return;

    const container = e.target;
    const center = container.scrollLeft + container.offsetWidth / 2;

    let activeIdx = 0;
    let minDiff = Infinity;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - center);

      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    setActiveSkillIndex(activeIdx);

    // If we reach the first card, reset navigation to forward
    if (activeIdx === 0) {
      setNavigationDirection('next');
    }

    // Do NOT automatically switch to next when reaching card 5
    // after coming backward from card 6.
    // The navigation direction is controlled by the arrow click.

    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.to(card, {
          scale: i === activeIdx ? 1 : 0.9,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });

    bgRefs.current.forEach((bg, i) => {
      if (bg) {
        gsap.to(bg, {
          opacity: i === activeIdx ? 1 : 0,
          duration: 0.4,
          overwrite: 'auto'
        });
      }
    });

    textRefs.current.forEach((txt, i) => {
      if (txt) {
        gsap.to(txt, {
          opacity: i === activeIdx ? 1 : 0,
          duration: 0.4,
          overwrite: 'auto'
        });
      }
    });
  };

  const handleSwipeLeft = () => {
    if (window.innerWidth >= 769 || !carouselRef.current) return;

    const container = carouselRef.current;
    const currentIndex = activeSkillIndex;

    let nextIndex;

    if (navigationDirection === 'previous') {
      // Continue moving backward
      nextIndex = currentIndex - 1;

      // If already at the first card, switch direction to forward
      if (nextIndex < 0) {
        setNavigationDirection('next');
        nextIndex = currentIndex + 1;
      }
    } else {
      // Move forward
      nextIndex = currentIndex + 1;

      // If we are at the last card, switch direction to backward
      if (nextIndex >= skillCategories.length) {
        setNavigationDirection('previous');
        nextIndex = currentIndex - 1;
      }
    }

    const targetCard = cardsRef.current[nextIndex];

    if (targetCard) {
      const targetScroll =
        targetCard.offsetLeft -
        (container.offsetWidth - targetCard.offsetWidth) / 2;

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        const updateCards = (p) => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const offset = i - p;

            const radius = 1800;
            const angleSpread = 18;

            const angle = offset * angleSpread;
            const rad = angle * Math.PI / 180;

            const x = Math.sin(rad) * radius;
            const y = radius - (Math.cos(rad) * radius);
            const z = -Math.abs(offset) * 50;

            const scale = Math.max(
              0.4,
              1 - Math.abs(offset) * 0.15
            );

            const rotateZ = angle;

            const opacity = Math.max(
              0.1,
              1 - Math.abs(offset) * 0.3
            );

            const zIndex = Math.round(
              100 - Math.abs(offset) * 10
            );

            gsap.set(card, {
              x: x,
              y: y,
              z: z,
              scale: scale,
              rotationZ: rotateZ,
              rotationY: 0,
              opacity: opacity,
              zIndex: zIndex,
            });
          });

          bgRefs.current.forEach((bg, i) => {
            if (!bg) return;

            const itemOpacity = Math.max(
              0,
              1 - Math.abs(i - p)
            );

            gsap.set(bg, {
              opacity: itemOpacity
            });

            if (textRefs.current[i]) {
              gsap.set(textRefs.current[i], {
                opacity: itemOpacity
              });
            }
          });
        };

        updateCards(0);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=500%',
          pin: true,
          scrub: 1,

          onUpdate: (self) => {
            const p =
              self.progress *
              (skillCategories.length - 1);

            updateCards(p);
          }
        });
      });

      mm.add('(max-width: 768px)', () => {
        cardsRef.current.forEach((card, i) => {
          if (card) {
            gsap.set(card, {
              clearProps: 'x,y,z,rotation,scale,opacity,position'
            });

            gsap.set(card, {
              scale: i === 0 ? 1 : 0.9
            });
          }
        });

        bgRefs.current.forEach((bg, i) => {
          if (bg) {
            gsap.set(bg, {
              clearProps: 'all',
              opacity: i === 0 ? 1 : 0
            });
          }
        });

        textRefs.current.forEach((txt, i) => {
          if (txt) {
            gsap.set(txt, {
              clearProps: 'all',
              opacity: i === 0 ? 1 : 0
            });
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0b0b0b] text-white overflow-hidden flex items-center justify-center md:[perspective:1000px] select-none"
    >

      {/* Responsive Episode 03 Skills Label */}
      <div className="absolute top-5 left-4 sm:top-7 sm:left-7 md:top-8 md:left-10 lg:left-16 z-[200] pointer-events-none">

        <div className="inline-flex h-8 gap-2 sm:h-9 items-center rounded-[4px] border border-red-600/80 bg-black/35 px-3 sm:px-4 backdrop-blur-md shadow-[0_0_24px_rgba(229,9,20,0.08)]">

          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>

          <span className="whitespace-nowrap font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E50914]">
            EPISODE 03
          </span>

          <span className="mx-2 sm:mx-3 h-3.5 w-px bg-white/35" />

          <span className="whitespace-nowrap font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90">
            CORE COMPETENCIES
          </span>

        </div>

        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_25px_rgba(229,9,20,0.35)]">
            TECHNICAL <br /> CAPABILITIES.
          </span>
        </h2>

      </div>

      {/* Dynamic Netflix Dark Background Vignettes */}
      {skillCategories.map((_, i) => (
        <div
          key={i}
          ref={el => bgRefs.current[i] = el}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 bg-gradient-to-tr from-black via-[#140203] to-black"
        />
      ))}

      {/* Massive Background Typography (Netflix Red & White Outline) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">

        {skillCategories.map((_, i) => (
          <h1
            key={`text-${i}`}
            ref={el => textRefs.current[i] = el}
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay"
            style={{
              WebkitTextStroke: `2px ${
                i % 2 === 0
                  ? 'rgba(229,9,20,0.3)'
                  : 'rgba(255,255,255,0.15)'
              }`,
              opacity: 0
            }}
          >
            SKILLS
          </h1>
        ))}

      </div>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative w-full h-full flex md:items-center md:justify-center z-10 md:[transform-style:preserve-3d] overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center px-[10vw] pt-32 pb-8 sm:pt-36 md:px-0 md:pt-0 md:pb-0 gap-4 md:gap-0 touch-pan-x"
        onScroll={handleScroll}
      >

        {skillCategories.map((category, i) => (
          <div
            key={i}
            ref={el => cardsRef.current[i] = el}
            data-skill-card
            className="md:absolute relative shrink-0 snap-center w-[82vw] sm:w-[360px] md:w-[440px] h-[460px] md:h-[540px] rounded-[32px] p-8 md:p-10 bg-[#141414]/95 backdrop-blur-2xl border border-white/15 flex flex-col justify-between overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.9)] hover:border-red-600/80 transition-colors duration-500"
          >

            {/* Inner Red Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />

            {/* Top Card Metadata */}
            <div className="flex items-center justify-between relative z-10">

              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-3 py-1 rounded border border-red-600/20">
                {category.tag}
              </span>

              <span className="text-xs font-mono text-white/40">
                [ 0{i + 1} / 06 ]
              </span>

            </div>

            {/* Middle Title & Description */}
            <div className="space-y-4 relative z-10 my-auto">

              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                {category.title}
              </h3>

              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                {category.desc}
              </p>

            </div>

            {/* Bottom Skill Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 relative z-10">

              {category.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded group-hover:border-red-600/30 transition-colors"
                >
                  {skill}
                </span>
              ))}

            </div>

            {/* Bottom Glow Accent */}
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />

          </div>
        ))}

      </div>

      {/* Mobile Navigation Arrow */}
      <button
        type="button"
        aria-label={
          navigationDirection === 'previous'
            ? 'Swipe to previous skill'
            : 'Swipe to next skill'
        }
        onClick={handleSwipeLeft}
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

export default Skills;