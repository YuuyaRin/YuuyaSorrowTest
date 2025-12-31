import React, { useState, useRef } from 'react';
import { Bunny } from './VisualAssets';

interface StageResistanceProps {
  onComplete: () => void;
}

export const StageResistance: React.FC<StageResistanceProps> = ({ onComplete }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const funnyTexts = [
    "还是生气 😤", 
    "抓不到略略略 🤪", 
    "哼！(扭头)", 
    "除非给我买奶茶 🧋", 
    "不理你不理你 🙉",
    "想得美 😏",
    "就不原谅 🙅‍♀️"
  ];

  const getButtonText = () => {
    if (attempts === 0) return "还是生气 😤";
    return funnyTexts[attempts % funnyTexts.length];
  };

  const moveButton = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const btnSize = { w: 140, h: 50 };
    const padding = 30;
    
    const limitX = (container.width / 2) - (btnSize.w / 2) - padding;
    const limitY = (container.height / 2) - (btnSize.h / 2) - padding;

    let newX, newY;
    do {
      newX = (Math.random() * 2 - 1) * limitX;
      newY = (Math.random() * 2 - 1) * limitY;
    } while (Math.abs(newX - noButtonPos.x) < 50 && Math.abs(newY - noButtonPos.y) < 50);

    setNoButtonPos({ x: newX, y: newY });
    setAttempts(prev => prev + 1);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* Pleading Bunny at the top */}
      <div className="mb-8 w-40 h-40 animate-float transition-all duration-300">
        <Bunny emotion={attempts > 3 ? 'pleading' : 'sad'} />
      </div>

      <h2 className="text-3xl text-rose-800 font-bold mb-10 text-center px-6 hand-font leading-relaxed drop-shadow-sm z-10">
        瑞瑞，<br/>还在生那个笨蛋的气吗？
      </h2>

      <div className="relative w-full h-48 flex items-center justify-center">
        
        {/* Yes Button */}
        <div className="absolute z-10">
           <button
            onClick={onComplete}
            className="group relative bg-gradient-to-r from-rose-400 to-red-500 text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-rose-300/50 animate-jelly overflow-hidden transition-all hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out skew-x-12 origin-left" />
            <span className="relative flex items-center gap-2 text-lg">
               原谅那个笨蛋 ✨
            </span>
          </button>
        </div>

        {/* No Button (Runaway) */}
        <div 
          className="absolute transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-20"
          style={{ transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)` }}
          onMouseEnter={moveButton}
          onTouchStart={moveButton}
        >
          <button
            className="bg-white/80 backdrop-blur-sm text-gray-500 px-6 py-3 rounded-full font-bold shadow-md whitespace-nowrap border border-gray-200 text-sm opacity-90 animate-jelly"
            tabIndex={-1}
          >
            {getButtonText()}
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 text-rose-800/50 text-xs font-medium bg-white/30 px-4 py-2 rounded-full">
        {attempts > 2 ? `( 小兔子已经撞墙 ${attempts} 次啦 )` : "试着抓抓看"}
      </div>
    </div>
  );
};