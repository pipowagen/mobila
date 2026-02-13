
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// --- TYPES ---
interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: {
    web?: {
      uri: string;
      title: string;
    }
  }[];
}

// --- SERVICES ---
const MODEL_NAME = 'gemini-3-flash-preview';

const getGeminiResponse = async (prompt: string, history: ChatMessage[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        ...history.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `Ești un asistent expert în design interior și mobilă la comandă pentru MaliMob Oanea, o firmă situată în Mălini, Suceava. 
        Scopul tău este să ajuți clienții să își planifice mobila (bucătării, dormitoare, living-uri). 
        Folosește Google Search pentru a oferi sfaturi despre trendurile de design din 2024-2025, materiale moderne și soluții ergonomice. 
        Fii politicos, profesionist și invită clienții să contacteze MaliMob Oanea pentru o ofertă personalizată.
        Răspunde întotdeauna în limba română.`,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "Ne pare rău, a apărut o eroare la generarea răspunsului.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

// --- COMPONENTS ---

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

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'servicii', href: '#servicii' },
    { name: 'proces', href: '#proces' },
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

      <div className={`fixed inset-0 z-[60] bg-black transition-all duration-500 md:hidden ${
        mobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
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
          <div className="w-12 h-[1px] bg-white/10"></div>
          <a href="tel:+40740000000" className="text-xl font-bold uppercase tracking-[0.4em] text-amber-500">SUNĂ ACUM</a>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="mt-8 px-10 py-4 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.5em] text-white/30 hover:text-white transition-all"
          >
            ÎNAPOI
          </button>
        </div>
      </div>
    </>
  );
};

const Hero: React.FC = () => (
  <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <h2 className="text-[40vw] md:text-[35vw] font-black leading-none opacity-[0.02] tracking-tighter text-white uppercase italic">OANEA</h2>
    </div>
    <div className="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000" alt="Interior" className="w-full h-full object-cover opacity-20 grayscale" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
    </div>
    <div className="max-w-7xl mx-auto px-6 w-full relative z-10 py-20">
      <div className="flex flex-col items-center text-center">
        <div className="mb-8 md:mb-12"><span className="text-amber-500 font-bold tracking-[0.6em] md:tracking-[1em] uppercase text-[8px] md:text-[9px]">Mălini • Handmade Excellence</span></div>
        <h1 className="text-5xl sm:text-7xl md:text-[14rem] font-black text-white leading-[0.8] mb-16 md:mb-20 tracking-tighter uppercase relative">
          MALIMOB
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 md:w-24 h-[1px] md:h-[2px] bg-amber-500"></span>
        </h1>
        <div className="grid md:grid-cols-3 w-full gap-8 md:gap-12 items-center border-t border-white/5 pt-12">
          <div className="hidden md:block text-left group">
             <p className="text-[9px] uppercase tracking-[0.5em] text-white/30 mb-3 font-black group-hover:text-amber-500">Atelier</p>
             <p className="text-sm font-light text-white/50">Artă în prelucrarea PAL-ului și MDF-ului, direct în inima Bucovinei.</p>
          </div>
          <div className="flex flex-col items-center order-first md:order-none">
             <a href="#contact" className="group relative px-12 md:px-16 py-5 md:py-6 overflow-hidden rounded-full transition-all duration-500 bg-white hover:bg-amber-500">
               <span className="relative z-10 text-black font-black text-[10px] md:text-[11px] uppercase tracking-[0.4em]">Proiect Nou</span>
             </a>
          </div>
          <div className="hidden md:block text-right group">
             <p className="text-[9px] uppercase tracking-[0.5em] text-white/30 mb-3 font-black group-hover:text-amber-500">Filozofie</p>
             <p className="text-sm font-light text-white/50">Măsurători precise și schițe clasice pentru un rezultat impecabil.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Services: React.FC = () => (
  <div className="py-40 px-6 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-16">
        {[
          { title: 'Bucătării', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800' },
          { title: 'Dormitoare', img: 'https://images.unsplash.com/photo-1505693419173-42b925886275?auto=format&fit=crop&q=80&w=800' },
          { title: 'Living-uri', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800' }
        ].map((s, i) => (
          <div key={i} className="group">
            <div className="relative aspect-[4/5] overflow-hidden mb-8 border border-white/5">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover opacity-50 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100 grayscale" />
              <div className="absolute top-8 left-8"><span className="text-white text-xs font-bold tracking-[0.3em]">0{i+1}</span></div>
            </div>
            <h3 className="text-3xl font-bold text-white uppercase tracking-tighter mb-4 flex items-center gap-4">
              {s.title}
              <span className="h-[1px] w-0 bg-amber-500 group-hover:w-12 transition-all duration-500"></span>
            </h3>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Process: React.FC = () => (
  <div className="py-24 md:py-40 px-6 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16 md:mb-24 text-center">
        <span className="text-amber-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Etapele Creării</span>
        <h2 className="text-3xl md:text-6xl font-bold text-white uppercase tracking-tighter">Drumul de la <span className="text-amber-500 italic font-serif">Idee la Realitate</span></h2>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-16 md:gap-12 relative">
        <div className="hidden md:block absolute top-8 left-0 w-full h-[1px] bg-white/5"></div>
        {[
          { title: 'Măsurători', desc: 'Dialog direct și schițe clasice pe foaie.' },
          { title: 'Materiale', desc: 'Alegerea nuanțelor și texturilor (PAL, MDF).' },
          { title: 'Atelier', desc: 'Execuție atentă și prelucrare manuală.' },
          { title: 'Montaj', desc: 'Instalare precisă în spațiul beneficiarului.' }
        ].map((step, idx, arr) => (
          <div key={idx} className="flex flex-col items-center text-center group relative z-10 flex-1 w-full max-w-[280px] md:max-w-none">
            <div className="w-16 h-16 rounded-full border border-white/10 bg-black flex items-center justify-center mb-6 group-hover:border-amber-500 transition-all duration-500">
              <span className="text-[10px] font-bold text-white group-hover:text-amber-500">0{idx + 1}</span>
            </div>
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white mb-3">{step.title}</h3>
            <p className="text-[10px] md:text-[11px] uppercase tracking-widest text-white/40 leading-relaxed">{step.desc}</p>
            {idx !== arr.length - 1 && <div className="md:hidden w-[1px] h-12 bg-gradient-to-b from-white/10 to-transparent mt-8"></div>}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Gallery: React.FC = () => (
  <div className="py-32 px-6 bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-white mb-4 uppercase tracking-tighter">Proiecte Recente</h2>
        <div className="w-12 h-1 bg-amber-500"></div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((id) => (
          <div key={id} className="relative group overflow-hidden rounded-2xl bg-slate-900 border border-white/5">
            <img src={`https://images.unsplash.com/photo-${id === 1 ? '1586023492125-27b2c045efd7' : id === 2 ? '1538688547191-f8aa95e58cd5' : id === 3 ? '1595428774223-ef52624120d2' : '1567016432779-094069958ea5'}?auto=format&fit=crop&q=80&w=800`} alt="MaliMob" className="w-full aspect-square object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await getGeminiResponse(input, messages);
      setMessages(prev => [...prev, { role: 'model', text: response.text, sources: response.sources.map((s: any) => ({ web: s.web ? { uri: s.web.uri, title: s.web.title } : undefined })) }]);
    } catch {
      setMessages(prev => [...prev, { role: 'model', text: "Eroare tehnică. Reîncearcă mai târziu." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/5 overflow-hidden my-20">
      <div className="bg-white/10 p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">💡</div>
          <div><h3 className="text-white font-bold text-sm">Asistent MaliMob</h3><p className="text-white/40 text-[10px] uppercase tracking-widest">Design & Materiale</p></div>
        </div>
        <div className="flex gap-2 items-center"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span><span className="text-green-500 text-[10px] font-bold uppercase tracking-widest">Live</span></div>
      </div>
      <div ref={scrollRef} className="h-[400px] overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && <p className="text-white/30 text-center italic text-sm py-10">Salut! Sunt aici să te ajut cu idei și sfaturi pentru mobila ta.</p>}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-5 py-3 ${msg.role === 'user' ? 'bg-amber-600 text-white' : 'bg-white/10 text-white/80 border border-white/5'}`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-2">
                  {msg.sources.map((src, idx) => src.web && <a key={idx} href={src.web.uri} target="_blank" rel="noopener" className="text-[9px] bg-white/5 px-2 py-1 rounded truncate max-w-[150px]">{src.web.title}</a>)}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-white/30 text-xs animate-pulse">Asistentul gândește...</div>}
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white/5 flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Întreabă despre trenduri, culori..." className="flex-grow bg-transparent border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:ring-1 focus:ring-amber-500 outline-none" />
        <button type="submit" disabled={isLoading} className="bg-amber-500 text-black p-3 rounded-xl font-bold">Trimite</button>
      </form>
    </div>
  );
};

const Contact: React.FC = () => (
  <div className="py-24 md:py-40 px-6 bg-black relative">
    <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02]">
      <h2 className="text-[40vw] font-black leading-none translate-y-1/2">CONTACT</h2>
    </div>
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <h2 className="text-4xl md:text-8xl font-bold text-white mb-12 tracking-tighter uppercase">ATELIERUL <span className="text-amber-500 italic font-serif">OANEA</span></h2>
      <div className="flex flex-col md:flex-row gap-4 mb-24">
        <a href="https://wa.me/40740000000" className="flex-1 bg-[#25D366] text-white py-6 rounded-full font-bold uppercase tracking-widest text-[10px]">WhatsApp</a>
        <a href="tel:+40740000000" className="flex-1 bg-white text-black py-6 rounded-full font-bold uppercase tracking-widest text-[10px]">Sună Acum</a>
      </div>
      <div className="grid md:grid-cols-2 gap-12 text-left border-t border-white/5 pt-16">
        <div><p className="text-amber-500 text-[9px] uppercase tracking-widest font-black mb-4">Locație</p><p className="text-xl md:text-2xl font-light text-white">Str. Meșteșugarilor 42, Mălini, Suceava</p></div>
        <div><p className="text-amber-500 text-[9px] uppercase tracking-widest font-black mb-4">Informații</p><p className="text-xl md:text-2xl font-light text-white">atelier@malimob-oanea.ro</p></div>
      </div>
    </div>
  </div>
);

const Footer: React.FC = () => (
  <footer className="bg-black text-white/20 py-24 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
      <div className="text-[10px] font-bold tracking-[0.8em] uppercase text-white">MALIMOB <span className="text-amber-500">OANEA</span></div>
      <div className="text-[9px] uppercase tracking-[0.4em]">&copy; {new Date().getFullYear()} Mălini • Crafted for life</div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-500 selection:text-black overflow-x-hidden font-light">
      <Navbar />
      <main>
        <section id="hero"><Hero /></section>
        <section id="servicii"><Services /></section>
        <div className="h-[1px] w-full bg-white/5 max-w-7xl mx-auto"></div>
        <section id="proces"><Process /></section>
        <section id="asistent" className="px-6"><AIConsultant /></section>
        <section id="portofoliu"><Gallery /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </div>
  );
};

// --- RENDER ---
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
