import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white py-10 sm:py-12 md:py-16 px-5 sm:px-6 md:px-12 border-t border-white/10 select-none relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col space-y-8 sm:space-y-10 md:space-y-12">
        
        {/* Top Section: Brand & Quick Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-7 sm:gap-8 pb-8 sm:pb-10 md:pb-12 border-b border-white/10">
          <div className="space-y-2">
            <div className="text-xl sm:text-2xl font-black text-red-600 tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(220,38,38,0.9)]">
              DHASWANTH NAG PRATHI<span className="w-1.5 h-1.5 rounded-full bg-white inline-block shrink-0"></span>
            </div>
            <p className="text-[9px] sm:text-xs font-mono text-white/50 tracking-widest uppercase leading-relaxed">
              // NETFLIX DEVELOPER SERIES &bull; SEASON 2026
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-4 sm:gap-x-6 sm:gap-y-4 md:gap-8 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/70 w-full md:w-auto">
            <a href="#home" className="hover:text-red-500 transition-colors">Home</a>
            <a href="#about" className="hover:text-red-500 transition-colors">About</a>
            <a href="#expertise" className="hover:text-red-500 transition-colors">Education</a>
            <a href="#skills" className="hover:text-red-500 transition-colors">Skills</a>
            <a href="#internships" className="hover:text-red-500 transition-colors">Internships</a>
            <a href="#projects" className="hover:text-red-500 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-red-500 transition-colors">Contact</a>
          </nav>
        </div>

        {/* Middle Section: Socials & External Profiles */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-7 text-[10px] sm:text-xs font-mono text-white/60">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-4 sm:gap-6">
            
            <a 
              href="https://github.com/dhaswanthnag" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-red-500 transition-colors uppercase tracking-wider"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.57 9.57 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481A10.002 10.002 0 0 0 22 12c0-5.523-4.477-10-10-10Z" />
              </svg>
              GitHub //
            </a>

            <a 
              href="https://www.linkedin.com/in/dhaswanth-nag/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-red-500 transition-colors uppercase tracking-wider"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM3.555 20.452h3.564V9H3.555v11.452Z" />
              </svg>
              LinkedIn //
            </a>

            <a 
              href="mailto:dhaswanthnag@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-red-500 transition-colors uppercase tracking-wider"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              GMail
            </a>

          </div>

          <div className="flex items-center gap-2 text-white/40 tracking-widest uppercase leading-relaxed text-[9px] sm:text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0"
            >
              <path d="M20 10c0 4.993-8 12-8 12S4 14.993 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>

            <span>
              LOCATION: PENDURRU, ANDHRA PRADESH, IN
            </span>
          </div>
        </div>

        {/* Bottom Copyright & Cinematic Tagline */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t border-white/5 text-[9px] sm:text-[11px] font-mono text-white/40 uppercase tracking-widest leading-relaxed">
          <p>&copy; {new Date().getFullYear()} Dhaswanth Nag Prathi. All Rights Reserved.</p>
          <p className="text-red-500/80 md:text-right">STREAMING WORLDWIDE &bull; BUILT WITH REACT & GSAP</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;