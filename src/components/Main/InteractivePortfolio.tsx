import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// --- DATA DEFINITIONS ---

// Phones: Order matters. Index 0 is bottom of stack, Index 3 is top.
const phonesData = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop', 
    title: 'Social Media',
    zIndex: 40, startX: 240, endX: -300,
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=600&auto=format&fit=crop',
    title: 'Branding',
    zIndex: 50, startX: 60, endX: -300,
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1596558450268-9c27524ba856?q=80&w=600&auto=format&fit=crop',
    title: 'Web Design',
    zIndex: 60,startX: -120, endX: -300, 
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=600&auto=format&fit=crop',
    title: 'Development',
    zIndex: 70, startX:  -300, endX: -300// Last to arrive, on top
  },
];

// Posters: Order matters. Index 0 is bottom, Index 5 is top.
const postersData = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?q=80&w=600&auto=format&fit=crop',
    title: 'Art Direction',
    zIndex: 10,
    startX: -360, 
    endX: 0
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop',
    title: 'Typography',
    zIndex: 20, 
    startX: -280, 
    endX: 0
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=600&auto=format&fit=crop',
    title: 'Poster A',
    zIndex: 30,
    startX: -200, 
    endX: 0
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1558655146-d09347e0b7a8?q=80&w=600&auto=format&fit=crop',
    title: 'Poster B',
    zIndex: 40,
    startX: -120, 
    endX: 0
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1590845947698-8924d7409b56?q=80&w=600&auto=format&fit=crop',
    title: 'Poster C',
    zIndex: 50,
    startX: -60, 
    endX: 0
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=600&auto=format&fit=crop',
    title: 'Poster D',
    zIndex: 60, // Last to arrive, on top
    startX: 0, 
    endX: 0
  },
];

// --- HOOKS ---

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

// --- STACK ITEM COMPONENT ---

const StackItem = ({ 
  data, 
  index,
  total,
  progress, 
  range, 
  isMobile,
  type 
}: { 
  data: any, 
  index: number,
  total: number,
  progress: MotionValue<number>, 
  range: [number, number],
  isMobile: boolean,
  type: 'phone' | 'poster'
}) => {
  // --- DESKTOP LOGIC ---

  // Calculations for PHONES (Stack at LEFT, Move R -> L)
  // Stack Anchor: -35% (Left side)
  // Spread Direction: +X (To the right)
  const PHONE_ANCHOR = -35;
  const PHONE_SPREAD = 18; // How far apart they are initially
  const PHONE_STACK_OFFSET = 3; // Minimal offset in final stack for depth

  // Calculations for POSTERS (Stack at RIGHT, Move L -> R)
  // Stack Anchor: +35% (Right side)
  // Spread Direction: -X (To the left)
  const POSTER_ANCHOR = 35;
  const POSTER_SPREAD = 14; 
  const POSTER_STACK_OFFSET = 3;

  let initialX, finalX;

  if (type === 'phone') {
    // PHONES
    // Final: Stacked at Anchor + slight index offset
    finalX = PHONE_ANCHOR + (index * PHONE_STACK_OFFSET);
    
    // Initial: Anchored + Spread based on index
    // Index 0 is base, Index 4 is furthest out
    initialX = PHONE_ANCHOR + (index * PHONE_SPREAD) + 10; // +10 base offset to center them more
  } else {
    // POSTERS
    // Final: Stacked at Anchor - slight index offset
    // We subtract offset so they stack 'inwards' or outwards? 
    // If Index 0 is bottom, Index 6 is top.
    // Let's stack them around the anchor.
    finalX = POSTER_ANCHOR - (index * POSTER_STACK_OFFSET);

    // Initial: Anchored - Spread
    initialX = POSTER_ANCHOR - (index * POSTER_SPREAD) - 10;
  }

  // --- MOBILE LOGIC (Vertical Stack) ---
  const initialY_Mobile = (index - (total - 1) / 2) * 120; // Spread vertically
  const finalY_Mobile = (index - (total - 1) / 2) * 15;   // Stacked vertically

  // --- TRANSFORMS ---

  const x = useTransform(progress, range, [
    isMobile ? 0 : data.startX,  // liczby w px
    isMobile ? 0 : data.endX
  ]);
  
  const y = useTransform(progress, range, [
    isMobile ? initialY_Mobile : 0,
    isMobile ? finalY_Mobile : 0
  ]);

  return (
    <motion.div
  style={{
    x,
    y,
    zIndex: data.zIndex,
    position: 'absolute',
    top: '50%',
    ...(isMobile
      ? { left: '50%' }
      : type === 'phone'
        ? { left: '4vw' }     // telefony kotwiczą po LEWEJ
        : { right: '4vw' }    // plakaty kotwiczą po PRAWEJ
    ),
  }}
  className={`
    origin-center
    -translate-y-1/2
    ${isMobile ? '-translate-x-1/2' : ''}
  `}
>

      {type === 'phone' ? (
        <div 
          className="
            relative 
            w-[220px] h-[440px] 
            md:w-[320px] md:h-[640px] 
            bg-black rounded-[40px] md:rounded-[50px] 
            border-[8px] md:border-[12px] border-zinc-900 
            overflow-hidden shadow-2xl
            flex flex-col
            
          "
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black z-50 rounded-b-2xl pointer-events-none" />
          
          <div className="flex-1 bg-white relative overflow-hidden group">
            <img 
              src={data.img} 
              alt={data.title} 
              className="w-full h-full object-cover"
              draggable="false"
            />
            <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-6 opacity-100 transition-opacity">
              <h3 className="text-white font-bold text-xl md:text-2xl uppercase tracking-tighter drop-shadow-md">{data.title}</h3>
            </div>
          </div>
        </div>
      ) : (
        // POSTER WRAPPER
        <div 
          className="
            relative 
            w-[240px] h-[340px] 
            md:w-[400px] md:h-[560px] 
            bg-white 
            overflow-hidden
            border-4 border-white
          "
        >
          <img 
            src={data.img} 
            alt={data.title} 
            className="w-full h-full object-cover"
            draggable="false"
          />
           <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex flex-col justify-end p-6 group">
             <div className="bg-black text-white px-2 py-1 w-fit text-xs font-mono uppercase group-hover:opacity-100 transition-opacity">
                {data.title}
             </div>
           </div>
        </div>
      )}
    </motion.div>
  );
};

// --- GENERIC SECTION COMPONENT ---

const StackSection = ({
  title,
  items,
  type,
  bgClass = "bg-zinc-950",
  textClass = "text-zinc-900"
}: {
  title: string,
  items: any[],
  type: 'phone' | 'poster',
  bgClass?: string,
  textClass?: string
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  
  // Use scroll hook for the specific section wrapper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      ref={containerRef} 
      className={`relative h-[300vh] ${bgClass}`}
    >
      {/* Sticky Container: Holds the viewport logic */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        
        {/* Background Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2
  className={`
    pointer-events-none select-none
    absolute bottom-70 ${type === 'poster' ? 'left-8' : 'right-8'}
    text-5xl md:text-6xl lg:text-7xl
    font-black uppercase tracking-tighter leading-none
    
    ${textClass}
  `}
>
            {title}
          </h2>
        </div>

        {/* Items Container */}
        <div className="relative w-full h-full max-w-[1400px] mx-auto perspective-[1000px]">
          {items.map((item, index) => {
            // Sequence Logic: 0 -> 1 total progress
            // Overlap: We want them to start cascading.
            // Items should finish roughly when progress finishes.
            
            // Calculate slice for this item
            const totalItems = items.length;
            const stepSize = 0.6 / totalItems; // Use 60% of scroll for entrance
            
            const start = index * stepSize;
            // The item finishes its move slightly after it starts, but let's give it time to settle.
            // Let's say each item takes 0.4 progress to move fully.
            const end = start + 0.4;
            
            // Clamp end to 1.0 (though framer handles this)
            
            return (
              <StackItem 
                key={item.id}
                data={item}
                index={index}
                total={totalItems}
                progress={scrollYProgress}
                range={[start, Math.min(end, 1)]}
                isMobile={isMobile}
                type={type}
              />
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-sm font-mono uppercase tracking-widest animate-bounce ${bgClass.includes('white') ? 'text-black/50' : 'text-white/50'}`}
        >
          Scroll to Stack
        </motion.div>
      </div>
    </section>
  );
};

// --- EXPORTED COMPONENT ---

export const InteractivePortfolio = () => {
  return (
    <>
      <StackSection 
        title="SOCIAL MEDIA design " 
        items={phonesData} 
        type="phone" 
        bgClass="bg-zinc-950"
        textClass="text-white/20" 
      />
      <StackSection 
        title="Posters" 
        items={postersData} 
        type="poster" 
        bgClass="bg-white"
        textClass="text-black/32" 
      />
    </>
  );
};

export default InteractivePortfolio;
