
import React from 'react';

const steps = [
  { 
    title: 'Măsurători', 
    desc: 'Dialog direct și schițe clasice pe foaie.' 
  },
  { 
    title: 'Materiale', 
    desc: 'Alegerea nuanțelor și texturilor (PAL, MDF).' 
  },
  { 
    title: 'Atelier', 
    desc: 'Execuție atentă și prelucrare manuală.' 
  },
  { 
    title: 'Montaj', 
    desc: 'Instalare precisă în spațiul beneficiarului.' 
  }
];

const Process: React.FC = () => {
  return (
    <div className="py-24 md:py-40 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 text-center">
          <span className="text-amber-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Etapele Creării</span>
          <h2 className="text-3xl md:text-6xl font-bold text-white uppercase tracking-tighter">
            Drumul de la <span className="text-amber-500 italic font-serif">Idee la Realitate</span>
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-16 md:gap-12 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-[1px] bg-white/5 -z-0"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group relative z-10 flex-1 w-full max-w-[280px] md:max-w-none">
              <div className="w-16 h-16 rounded-full border border-white/10 bg-black flex items-center justify-center mb-6 md:mb-8 group-hover:border-amber-500 transition-all duration-500 transform group-hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                <span className="text-[10px] font-bold text-white group-hover:text-amber-500 transition-colors">0{idx + 1}</span>
              </div>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white mb-3 md:mb-4">{step.title}</h3>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-widest text-white/40 leading-relaxed">
                {step.desc}
              </p>
              
              {/* Mobile Separator Line */}
              {idx !== steps.length - 1 && (
                <div className="md:hidden w-[1px] h-12 bg-gradient-to-b from-white/10 to-transparent mt-8"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Process;
