import React, { useState } from 'react';
import { Bunny } from './VisualAssets';

interface StageLockedProps {
  onUnlock: () => void;
}

export const StageLocked: React.FC<StageLockedProps> = ({ onUnlock }) => {
  const [clicks, setClicks] = useState(0);
  const [animationState, setAnimationState] = useState<'idle' | 'shake' | 'open'>('idle');

  const handleClick = () => {
    if (animationState === 'open') return;

    setAnimationState('shake');
    setClicks(prev => prev + 1);
    
    // Reset shake
    setTimeout(() => setAnimationState('idle'), 400);

    if (clicks >= 4) {
      setAnimationState('open');
      setTimeout(onUnlock, 800);
    }
  };

  const getMessage = () => {
    if (clicks === 0) return "这里有个神秘包裹...";
    if (clicks < 3) return "谁送的呀？";
    if (clicks < 5) return "是不是那个笨蛋？";
    return "抓到了！";
  };

  return (
    <div className="flex flex-col items-center justify-center h-full relative z-20">
      
      {/* Container for Bunny and Box interaction */}
      {/* Ensure overflow is visible so ears don't get clipped */}
      <div className="relative w-64 h-64 flex items-center justify-center overflow-visible">
        
        {/* The Bunny Peeking Behind */}
        <div className={`absolute transition-all duration-500 ease-out transform
          ${clicks > 0 ? '-translate-y-28 opacity-100' : 'translate-y-0 opacity-0'}
          ${clicks > 2 ? '-translate-y-36' : ''}
          w-48 h-48 z-0
        `}>
          <Bunny emotion="peeking" />
        </div>

        {/* The Box */}
        <div 
          onClick={handleClick}
          className={`
            relative z-10 w-40 h-40 bg-gradient-to-br from-rose-400 to-rose-500 rounded-3xl shadow-xl flex items-center justify-center cursor-pointer
            border-4 border-white/30
            transition-all duration-200
            ${animationState === 'shake' ? 'animate-[shake_0.4s_ease-in-out]' : 'animate-float'}
            active:scale-95
            hover:shadow-rose-400/50 hover:shadow-2xl
          `}
        >
          {/* Box Ribbon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-full bg-rose-300/50"></div>
            <div className="absolute h-8 w-full bg-rose-300/50"></div>
          </div>
          
          <span className="text-6xl filter drop-shadow-md transform transition-transform group-hover:scale-110">🎁</span>
        </div>
      </div>
      
      <div className="mt-12 text-center space-y-3">
        <p className="text-shine text-2xl font-bold tracking-widest hand-font">
          {getMessage()}
        </p>
        <div className="flex justify-center space-x-1">
          <span className={`h-2 w-2 rounded-full bg-rose-400 ${clicks >= 1 ? 'opacity-100' : 'opacity-20'}`}></span>
          <span className={`h-2 w-2 rounded-full bg-rose-400 ${clicks >= 3 ? 'opacity-100' : 'opacity-20'}`}></span>
          <span className={`h-2 w-2 rounded-full bg-rose-400 ${clicks >= 5 ? 'opacity-100' : 'opacity-20'}`}></span>
        </div>
      </div>
    </div>
  );
};