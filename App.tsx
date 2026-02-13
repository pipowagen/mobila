
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-500 selection:text-black overflow-x-hidden font-light">
      <Navbar />
      <main>
        <section id="hero">
          <Hero />
        </section>

        <section id="servicii">
          <Services />
        </section>
        
        <div className="h-[1px] w-full bg-white/5 max-w-7xl mx-auto"></div>

        <section id="proces">
          <Process />
        </section>

        <section id="portofoliu">
          <Gallery />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
