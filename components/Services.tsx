
import React from 'react';

const services = [
  {
    title: 'Bucătării',
    img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Dormitoare',
    img: 'https://images.unsplash.com/photo-1505693419173-42b925886275?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Living-uri',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800'
  }
];

const Services: React.FC = () => {
  return (
    <div className="py-40 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16">
          {services.map((s, i) => (
            <div key={i} className="group cursor-none">
              <div className="relative aspect-[4/5] overflow-hidden mb-8 border border-white/5">
                <img 
                  src={s.img} 
                  alt={s.title} 
                  className="w-full h-full object-cover opacity-50 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100 grayscale"
                />
                <div className="absolute top-8 left-8">
                  <span className="text-white text-xs font-bold tracking-[0.3em] uppercase">0{i+1}</span>
                </div>
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
};

export default Services;
