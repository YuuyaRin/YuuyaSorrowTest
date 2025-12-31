import React from 'react';
import { ApologyContent } from '../types';
import { Bunny } from './VisualAssets';

interface StageRevealProps {
  content: ApologyContent;
  onAccept: () => void;
}

export const StageReveal: React.FC<StageRevealProps> = ({ content, onAccept }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-5 max-w-md mx-auto w-full z-20 pt-10">
      
      {/* Bunny peeking over the top of the letter */}
      <div className="w-28 h-28 -mb-10 z-10 relative animate-ears">
        <Bunny emotion="shy" />
      </div>

      {/* Letter Card */}
      <div className="w-full glass-card p-8 pb-10 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(255,183,197,0.5)] transform transition-all duration-700 relative overflow-hidden group border-2 border-white/60">
        
        {/* Paper Texture / Lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 29px, #000 30px)', backgroundSize: '100% 30px', marginTop: '80px' }}>
        </div>

        {/* Stamps/Deco */}
        <div className="absolute top-4 right-4 opacity-20 rotate-12">
           <svg width="60" height="60" viewBox="0 0 100 100" fill="red"><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/><text x="50" y="55" textAnchor="middle" fontSize="20" fill="currentColor">URGENT</text></svg>
        </div>

        <h1 className="text-2xl font-bold text-rose-900 mb-6 text-center hand-font relative z-10 pt-4">
          {content.title}
        </h1>
        
        <div className="text-gray-700 text-lg leading-loose font-medium text-justify serif-font whitespace-pre-wrap relative z-10">
          {content.body}
        </div>
        
        <div className="mt-8 flex justify-end items-center space-x-2 relative z-10 opacity-80">
          <span className="text-xs text-rose-400 font-bold bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            来自: 经常犯错的错误王（King of Error）
          </span>
        </div>
      </div>

      <button
        onClick={onAccept}
        className="mt-8 mb-4 bg-gradient-to-r from-rose-400 via-rose-500 to-red-500 text-white px-12 py-4 rounded-full font-bold text-xl shadow-lg shadow-rose-300/50 animate-jelly active:scale-95 transition-all border-2 border-white/20 relative overflow-hidden"
      >
        <span className="relative z-10">啾咪 (づ｡◕‿‿◕｡)づ</span>
        <div className="absolute inset-0 bg-white/20 animate-[shine_2s_infinite] skew-x-12" />
      </button>
    </div>
  );
};