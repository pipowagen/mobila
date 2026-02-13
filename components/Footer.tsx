
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white/20 py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-[10px] font-bold tracking-[0.8em] uppercase text-white">
          MALIMOB <span className="text-amber-500">OANEA</span>
        </div>
        
        <div className="flex gap-12 text-[9px] uppercase tracking-[0.3em] font-bold">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <a href="#" className="hover:text-white transition-colors">Email</a>
        </div>

        <div className="text-[9px] uppercase tracking-[0.4em]">
          &copy; {new Date().getFullYear()} Mălini • Crafted for life
        </div>
      </div>
    </footer>
  );
};

export default Footer;
