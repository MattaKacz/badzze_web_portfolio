import React, { useRef } from 'react';
import { motion } from 'framer-motion';

// SVG Noise generation
const NoiseOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay">
    <svg className='w-full h-full'>
      <filter id='noiseFilter'>
        <feTurbulence 
          type='fractalNoise' 
          baseFrequency='0.8' 
          numOctaves='3' 
          stitchTiles='stitch'
        />
      </filter>
      <rect width='100%' height='100%' filter='url(#noiseFilter)' />
    </svg>
  </div>
);

const stickers = [
  { 
    id: 1, 
    src: 'https://images.unsplash.com/photo-1590845947698-8924d7409b56?q=80&w=300&auto=format&fit=crop', 
    alt: 'Sticker 1',
    initialX: -400, 
    initialY: -200, 
    rotate: -15,
    className: 'w-48 h-64 md:w-64 md:h-80 z-20'
  },
  { 
    id: 2, 
    src: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?q=80&w=300&auto=format&fit=crop', 
    alt: 'Sticker 2',
    initialX: 450, 
    initialY: -250, 
    rotate: 15,
    className: 'w-40 h-40 md:w-56 md:h-56 z-10'
  },
  { 
    id: 3, 
    src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=300&auto=format&fit=crop', 
    alt: 'Sticker 3',
    initialX: -500, 
    initialY: 200,
    rotate: 5,
    className: 'w-56 h-56 md:w-72 md:h-72 z-30'
  },
  { 
    id: 4, 
    src: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=300&auto=format&fit=crop', 
    alt: 'Sticker 4',
    initialX: 500, 
    initialY: 150,
    rotate: -8,
    className: 'w-48 h-64 md:w-60 md:h-80 z-20'
  },
  { 
    id: 5, 
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop', 
    alt: 'Sticker 5',
    initialX: -250, 
    initialY: -300,
    rotate: 20,
    className: 'w-32 h-32 md:w-44 md:h-44 z-15'
  },
  { 
    id: 6, 
    src: 'https://images.unsplash.com/photo-1558655146-d09347e0b7a8?q=80&w=300&auto=format&fit=crop', 
    alt: 'Sticker 6',
    initialX: 350, 
    initialY: 250, 
    rotate: -12,
    className: 'w-36 h-36 md:w-48 md:h-48 z-25'
  },
   { 
    id: 7, 
    src: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=300&auto=format&fit=crop', 
    alt: 'Sticker 7',
    initialX: 0, 
    initialY: -350, 
    rotate: 5,
    className: 'w-40 h-24 md:w-52 md:h-32 z-10'
  },
    { 
    id: 8, 
    src: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=300&auto=format&fit=crop', 
    alt: 'Sticker 8',
    initialX: -100, 
    initialY: 350,
    rotate: -3,
    className: 'w-32 h-40 md:w-40 md:h-52 z-10'
  }
];

export const InteractiveHero = () => {
  const constraintsRef = useRef(null);

  return (
    <section 
      ref={constraintsRef} 
      className="relative w-full h-screen overflow-hidden bg-background text-foreground flex flex-col" 
    >
      <NoiseOverlay />

      {/* Navigation */}
      {/* <nav className="absolute top-0 left-0 w-full p-4 md:p-10 flex justify-between items-start z-50 pointer-events-none mix-blend-difference text-white md:text-black md:mix-blend-normal">
        <div className="flex gap-4 md:gap-12 pointer-events-auto">
          <a href="#about" className="hover:underline font-black text-xl md:text-3xl uppercase tracking-tighter">* O MNIE</a>
        </div>
        
        <div className="flex gap-4 md:gap-12 pointer-events-auto">
          <a href="#portfolio" className="hover:underline font-black text-xl md:text-3xl uppercase tracking-tighter">PORTFOLIO</a>
          <a href="#offer" className="hover:underline font-black text-xl md:text-3xl uppercase tracking-tighter hidden md:block">OFERTA</a>
        </div>

        <div className="flex gap-4 md:gap-12 pointer-events-auto">
          <a href="#contact" className="hover:underline font-black text-xl md:text-3xl uppercase tracking-tighter">KONTAKT</a>
        </div>
      </nav> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-0 mt-12 md:mt-0">
        <div className="relative flex items-center justify-center w-full">
          <h1 className="text-[18vw] leading-none font-display font-black tracking-tighter text-center select-none pointer-events-none mix-blend-overlay opacity-90 md:opacity-100 md:mix-blend-normal">
            BĄDŹŻE
          </h1>
          
          <div className="absolute top-[60%] left-[68%] md:top-[65%] md:left-[62%] -translate-x-1/2 -translate-y-1/2 bg-white text-black border-2 border-black px-4 py-1 md:px-8 md:py-2 rounded-full transform -rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-40 pointer-events-none whitespace-nowrap">
            <span className="font-bold text-sm md:text-xl tracking-widest uppercase font-display">Studio Graficzne</span>
          </div>
        </div>
      </div>

      {/* Draggable Stickers */}
      {/* Container is explicitly constrained by constraintsRef (the section) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {stickers.map((sticker) => (
          <motion.div
            key={sticker.id}
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false} // Prevents flying off too far
            dragElastic={0.1} // Resistance at edges
            whileHover={{ scale: 1.05, cursor: 'pointer', zIndex: 50 }}
            whileDrag={{ scale: 1.1, cursor: 'pointer', zIndex: 60 }}
            initial={{ 
              x: sticker.initialX, 
              y: sticker.initialY, 
              rotate: sticker.rotate, 
              opacity: 0 
            }}
            animate={{ 
              opacity: 1, 
              transition: { duration: 0.8, delay: 0.2 } 
            }}
            // Centering logic handled by translate via CSS + x/y offset from Framer Motion
            // We use transform: translate(-50%, -50%) to center the element on its anchor point, 
            // and top/left: 50% to place that anchor in the screen center.
            className={`absolute pointer-events-auto shadow-2xl rounded-sm overflow-hidden border-4 border-white ${sticker.className}`}
            style={{ 
              top: '50%', 
              left: '50%',
              // Using translate to center the element itself on the coordinate point
              transform: 'translate(-50%, -50%)' 
            }}
          >
            <img 
              src={sticker.src} 
              alt={sticker.alt} 
              className="w-full h-full object-cover pointer-events-none select-none" 
              draggable="false"
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-10 right-10 text-xs md:text-sm font-bold uppercase tracking-widest opacity-50 pointer-events-none animate-pulse">
        Chwyć i przesuń grafiki
      </div>
    </section>
  );
};

export default InteractiveHero;
