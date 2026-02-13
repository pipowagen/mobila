
import React from 'react';

const projects = [
  { id: 1, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800' },
  { id: 2, img: 'https://images.unsplash.com/photo-1538688547191-f8aa95e58cd5?auto=format&fit=crop&q=80&w=600' },
  { id: 3, img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600' },
  { id: 4, img: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=700' },
];

const Gallery: React.FC = () => {
  return (
    <div className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-4 uppercase tracking-tighter">Proiecte Recente</h2>
          <div className="w-12 h-1 bg-amber-500"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="relative group overflow-hidden rounded-2xl bg-slate-900 border border-white/5">
              <img 
                src={p.img} 
                alt="MaliMob Portfolio" 
                className="w-full aspect-square object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
