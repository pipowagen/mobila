
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Giant Text - OANEA */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h2 className="text-[40vw] md:text-[35vw] font-black leading-none opacity-[0.02] tracking-tighter text-white uppercase italic">
          OANEA
        </h2>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern Interior" 
          className="w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 py-20">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 md:mb-12 overflow-hidden">
            <span className="inline-block text-amber-500 font-bold tracking-[0.6em] md:tracking-[1em] uppercase text-[8px] md:text-[9px]">
              Mălini • Handmade Excellence
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-[14rem] font-black text-white leading-[0.8] mb-16 md:mb-20 tracking-tighter uppercase relative">
            MALIMOB
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 md:w-24 h-[1px] md:h-[2px] bg-amber-500"></span>
          </h1>

          <div className="grid md:grid-cols-3 w-full gap-8 md:gap-12 items-center border-t border-white/5 pt-12 md:pt-16">
            <div className="hidden md:block text-left group">
               <p className="text-[9px] uppercase tracking-[0.5em] text-white/30 mb-3 font-black group-hover:text-amber-500 transition-colors">Atelier</p>
               <p className="text-sm font-light text-white/50 leading-relaxed">Artă în prelucrarea PAL-ului și MDF-ului, direct în inima Bucovinei.</p>
            </div>
            
            <div className="flex flex-col items-center order-first md:order-none">
               <a
                href="#contact"
                className="group relative px-12 md:px-16 py-5 md:py-6 overflow-hidden rounded-full transition-all duration-500 w-full md:w-auto text-center"
              >
                <div className="absolute inset-0 bg-white group-hover:bg-amber-500 transition-colors duration-500"></div>
                <span className="relative z-10 text-black font-black text-[10px] md:text-[11px] uppercase tracking-[0.4em]">
                  Proiect Nou
                </span>
              </a>
            </div>

            <div className="hidden md:block text-right group">
               <p className="text-[9px] uppercase tracking-[0.5em] text-white/30 mb-3 font-black group-hover:text-amber-500 transition-colors">Filozofie</p>
               <p className="text-sm font-light text-white/50 leading-relaxed">Măsurători precise și schițe clasice pentru un rezultat impecabil.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-1/4 w-[1px] h-24 md:h-48 bg-gradient-to-b from-amber-500/30 to-transparent"></div>
      <div className="absolute bottom-0 right-1/4 w-[1px] h-24 md:h-48 bg-gradient-to-t from-amber-500/30 to-transparent"></div>
    </div>
  );
};

export default Hero;
