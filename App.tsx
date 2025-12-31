import React, { useState, useEffect } from 'react';
import { AppStage, ApologyContent } from './types';
import { generateApology } from './services/geminiService';
import { StageLocked } from './components/StageLocked';
import { StageResistance } from './components/StageResistance';
import { StageReveal } from './components/StageReveal';
import { Confetti } from './components/Confetti';
import { Bunny, SparkleIcon } from './components/VisualAssets';

// Background Floating Particles
const FloatingParticles = () => {
  const [items, setItems] = useState<Array<{id: number, left: number, delay: number, type: string}>>([]);

  useEffect(() => {
    // Generate static items on mount to avoid re-render flicker
    const newItems = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      type: Math.random() > 0.6 ? '🐰' : (Math.random() > 0.5 ? '❤️' : '☁️')
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute text-2xl opacity-40 animate-float"
          style={{
            left: `${item.left}%`,
            bottom: '-10%',
            animationDuration: `${15 + Math.random() * 10}s`,
            animationDelay: `${item.delay}s`,
            fontSize: `${Math.random() * 20 + 20}px`
          }}
        >
          {item.type}
        </div>
      ))}
    </div>
  );
};

// Fun Loading Component
const Loading: React.FC = () => {
  const [text, setText] = useState("正在搜索搓衣板...");
  
  useEffect(() => {
    const texts = [
      "正在搜索搓衣板...",
      "正在向瑞瑞发射脑电波...",
      "正在删除让瑞瑞生气的记忆...",
      "正在组织用语 (紧张ing)..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setText(texts[i]);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 z-20">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 border-4 border-rose-100 border-t-rose-500 rounded-full animate-spin"></div>
        <div className="w-20 h-20 animate-bounce">
          <Bunny emotion="neutral" />
        </div>
      </div>
      <p className="text-rose-800 font-bold text-lg animate-pulse hand-font tracking-wider bg-white/40 px-6 py-3 rounded-full backdrop-blur-sm border border-white/50 shadow-sm">
        {text}
      </p>
    </div>
  );
};

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.LOCKED);
  const [content, setContent] = useState<ApologyContent | null>(null);

  const handleResistanceComplete = async () => {
    setStage(AppStage.GENERATING);
    try {
      const result = await generateApology();
      setContent(result);
      setStage(AppStage.REVEAL);
    } catch (e) {
      setStage(AppStage.REVEAL);
    }
  };

  const getBackground = () => {
    switch(stage) {
      case AppStage.LOCKED: return 'bg-gradient-to-br from-[#FFF5E4] to-[#FFD1DC]'; // Cream to Pink
      case AppStage.RESISTANCE: return 'bg-gradient-to-br from-[#FFE4E1] to-[#FFB7C5]'; // MistyRose to Pink
      case AppStage.GENERATING: return 'bg-gradient-to-br from-[#FFD1DC] to-[#E6E6FA]'; // Pink to Lavender
      case AppStage.REVEAL: return 'bg-gradient-to-br from-[#FFF0F5] via-[#FFE4E1] to-[#E0FFFF]'; // Complex Pastel
      case AppStage.ACCEPTED: return 'bg-[#FFF5F5]';
      default: return 'bg-rose-50';
    }
  };

  return (
    <div className={`w-full h-dvh transition-all duration-1000 ease-in-out ${getBackground()} overflow-hidden relative`}>
      
      {/* Global Background Elements */}
      <FloatingParticles />
      
      {/* Soft Light Blobs */}
      <div className="fixed top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-rose-400/10 rounded-full blur-[80px] pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-20%] right-[-20%] w-[70vw] h-[70vw] bg-blue-300/10 rounded-full blur-[80px] pointer-events-none" />

      <main className="relative z-10 w-full h-full max-w-lg mx-auto">
        {stage === AppStage.LOCKED && (
          <StageLocked onUnlock={() => setStage(AppStage.RESISTANCE)} />
        )}

        {stage === AppStage.RESISTANCE && (
          <StageResistance onComplete={handleResistanceComplete} />
        )}

        {stage === AppStage.GENERATING && (
          <Loading />
        )}

        {stage === AppStage.REVEAL && content && (
          <StageReveal 
            content={content} 
            onAccept={() => setStage(AppStage.ACCEPTED)} 
          />
        )}

        {stage === AppStage.ACCEPTED && (
          <div className="flex flex-col items-center justify-center h-full z-20">
            <Confetti />
            
            <div className="relative w-64 h-64 mb-6">
                {/* Two bunnies hugging? Or just one Happy one jumping */}
                 <div className="w-full h-full animate-bounce">
                    <Bunny emotion="happy" />
                 </div>
                 <div className="absolute top-0 right-0 animate-ping">✨</div>
                 <div className="absolute bottom-10 left-0 animate-ping delay-700">💖</div>
            </div>

            <h1 className="text-4xl font-bold text-rose-600 hand-font mb-4 text-shine">和好啦！</h1>
            <p className="text-rose-400 text-lg font-medium tracking-wide">瑞瑞真是全宇宙最好的女孩</p>
            
            <button 
                onClick={() => window.location.reload()}
                className="mt-12 px-6 py-2 rounded-full bg-white/50 text-rose-400 text-sm font-bold border border-white/60 hover:bg-white transition-colors"
            >
                再玩一次 ↺
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;