
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="py-24 md:py-40 px-6 bg-black relative">
       {/* Giant Background Text Again */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.02]">
        <h2 className="text-[40vw] md:text-[30vw] font-black leading-none translate-y-1/2">
          CONTACT
        </h2>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-8xl font-bold text-white mb-12 md:mb-20 tracking-tighter uppercase">
          ATELIERUL <span className="text-amber-500 italic font-serif">OANEA</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-16 md:mb-24">
          <a
            href="https://wa.me/40740000000"
            className="flex-1 bg-[#25D366] text-white py-6 md:py-8 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#25D366]/20"
          >
            WhatsApp Direct
          </a>
          <a
            href="https://m.me/malimob.oanea"
            className="flex-1 bg-[#0084FF] text-white py-6 md:py-8 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#0084FF]/20"
          >
            Messenger
          </a>
          <a
            href="tel:+40740000000"
            className="flex-1 bg-white text-black py-6 md:py-8 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            Sună Acum
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 text-left border-t border-white/5 pt-16 md:pt-20">
          <div className="group">
            <p className="text-amber-500 text-[9px] uppercase tracking-[0.5em] font-black mb-4 md:mb-6">Locație</p>
            <p className="text-xl md:text-2xl font-light text-white leading-relaxed">Str. Meșteșugarilor 42, Mălini, Suceava</p>
          </div>
          <div className="group">
            <p className="text-amber-500 text-[9px] uppercase tracking-[0.5em] font-black mb-4 md:mb-6">Informații</p>
            <p className="text-xl md:text-2xl font-light text-white leading-relaxed">atelier@malimob-oanea.ro</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
