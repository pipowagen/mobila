
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'servicii', href: '#servicii' },
    { name: 'portofoliu', href: '#portofoliu' },
    { name: 'contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-700 py-6 md:py-10 px-6 md:px-8 ${
        isScrolled || mobileMenuOpen ? 'bg-black/95 backdrop-blur-xl border-b border-white/5 py-5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#hero" className="group flex items-center gap-3 relative z-[70]">
            <div className="flex flex-col">
              <span className="text-xl md:text-3xl font-black tracking-[0.3em] text-white leading-none">
                MALIMOB
              </span>
              <span className="text-[7px] md:text-[8px] font-bold tracking-[0.9em] text-amber-500 mt-1 uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                OANEA • MĂLINI
              </span>
            </div>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-12 items-center">
            {navLinks.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 hover:text-white transition-all hover:translate-y-[-1px]"
              >
                {item.name}
              </a>
            ))}
            <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
            <a href="tel:+40740000000" className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500 hover:text-white transition-colors">
              SUNĂ ACUM
            </a>
          </div>

          {/* Mobile Toggle Button (remains visible over the menu) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative z-[70] w-12 h-12 flex flex-col justify-center items-center gap-2 focus:outline-none"
            aria-label={mobileMenuOpen ? 'Închide Meniu' : 'Deschide Meniu'}
          >
            <span className={`w-8 h-0.5 bg-white transition-all duration-500 ${mobileMenuOpen ? 'rotate-45 translate-y-2.5 bg-amber-500' : ''}`}></span>
            <span className={`w-8 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`w-8 h-0.5 bg-white transition-all duration-500 ${mobileMenuOpen ? '-rotate-45 -translate-y-2.5 bg-amber-500' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] bg-black transition-all duration-500 md:hidden ${
        mobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        {/* Decorative background text for menu */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.03]">
          <span className="text-[40vh] font-black rotate-90 whitespace-nowrap">MALIMOB</span>
        </div>

        <div className="flex flex-col items-center justify-center h-full gap-10 px-8 relative z-10">
          {navLinks.map((item, idx) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={() => setMobileMenuOpen(false)}
              className={`text-3xl font-black uppercase tracking-[0.5em] text-white/40 hover:text-amber-500 transition-all duration-500 ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {item.name}
            </a>
          ))}
          
          <div className={`w-12 h-[1px] bg-white/10 transition-all duration-1000 ${mobileMenuOpen ? 'scale-x-100' : 'scale-x-0'}`}></div>
          
          <a 
            href="tel:+40740000000" 
            className={`text-xl font-bold uppercase tracking-[0.4em] text-amber-500 transition-all duration-500 delay-400 ${
              mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            SUNĂ ACUM
          </a>

          {/* Explicit Back/Close Button */}
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className={`mt-8 px-10 py-4 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.5em] text-white/30 hover:text-white hover:border-white transition-all duration-500 ${
              mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            ÎNAPOI
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
