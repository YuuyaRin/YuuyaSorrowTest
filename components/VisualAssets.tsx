import React from 'react';

type Emotion = 'happy' | 'sad' | 'neutral' | 'pleading' | 'peeking' | 'shy';

interface BunnyProps {
  emotion?: Emotion;
  className?: string;
}

export const Bunny: React.FC<BunnyProps> = ({ emotion = 'neutral', className = '' }) => {
  // Base colors
  const colorBody = "#FFFFFF";
  const colorShadow = "#F0F0F0";
  const colorPink = "#FFB7C5"; // Ears and Cheeks
  const colorStroke = "#4A4A4A";

  return (
    <div className={`relative ${className}`}>
      {/* 
        Updated viewBox: 0 -50 200 300 
        - y starts at -50 to give ears plenty of room at the top
        - Height increased to 300 to accommodate the shift
      */}
      <svg viewBox="0 -50 200 300" className="w-full h-full drop-shadow-lg" style={{ overflow: 'visible' }}>
        {/* Defs for gradients */}
        <defs>
          <radialGradient id="cheekGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD1DC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFD1DC" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Group for main float animation - Pivot at bottom center of body */}
        <g className="animate-float" style={{ transformOrigin: '100px 180px' }}>
          
          {/* 
            Ears Group 
            Pivot point set to (100px, 50px) which is roughly the top center of the head 
            where ears attach. This fixes the "uncoordinated" rotation.
          */}
          <g className="animate-ears" style={{ transformOrigin: '100px 50px' }}>
            {/* Left Ear */}
            <path d="M70 50 C 40 -20, 10 10, 40 80" fill={colorBody} stroke={colorStroke} strokeWidth="3" />
            <path d="M70 50 C 45 -10, 25 15, 45 70" fill={colorPink} opacity="0.6" />
            
            {/* Right Ear */}
            <path d="M130 50 C 160 -20, 190 10, 160 80" fill={colorBody} stroke={colorStroke} strokeWidth="3" />
            <path d="M130 50 C 155 -10, 175 15, 155 70" fill={colorPink} opacity="0.6" />
          </g>

          {/* Body/Head Shape - Moved down slightly to center in new viewBox */}
          <ellipse cx="100" cy="130" rx="75" ry="65" fill={colorBody} stroke={colorStroke} strokeWidth="3" />
          
          {/* Inner Shadow for depth */}
          <ellipse cx="100" cy="130" rx="65" ry="55" fill={colorShadow} opacity="0.2" />

          {/* Cheeks */}
          <circle cx="55" cy="140" r="14" fill="url(#cheekGradient)" opacity="0.8" />
          <circle cx="145" cy="140" r="14" fill="url(#cheekGradient)" opacity="0.8" />

          {/* Face - Eyes */}
          <g className="bunny-eye animate-blink" style={{ transformOrigin: '100px 120px' }}>
            {emotion === 'happy' && (
              <>
                <path d="M60 115 Q 70 105, 80 115" fill="none" stroke={colorStroke} strokeWidth="3" strokeLinecap="round" />
                <path d="M120 115 Q 130 105, 140 115" fill="none" stroke={colorStroke} strokeWidth="3" strokeLinecap="round" />
              </>
            )}
            {(emotion === 'neutral' || emotion === 'peeking') && (
              <>
                <circle cx="70" cy="115" r="6" fill={colorStroke} />
                <circle cx="130" cy="115" r="6" fill={colorStroke} />
              </>
            )}
            {(emotion === 'sad' || emotion === 'pleading') && (
              <>
                <circle cx="70" cy="118" r="7" fill={colorStroke} />
                <circle cx="73" cy="115" r="2.5" fill="white" />
                <circle cx="130" cy="118" r="7" fill={colorStroke} />
                <circle cx="133" cy="115" r="2.5" fill="white" />
                {/* Tears */}
                {emotion === 'pleading' && (
                    <>
                    <path d="M65 130 Q 60 140, 65 145" fill="none" stroke="#AEE" strokeWidth="2" opacity="0.7" />
                    <path d="M135 130 Q 140 140, 135 145" fill="none" stroke="#AEE" strokeWidth="2" opacity="0.7" />
                    </>
                )}
              </>
            )}
          </g>

          {/* Face - Mouth/Nose */}
          <g transform="translate(100, 135)">
             {emotion === 'sad' || emotion === 'pleading' ? (
                 // Sad Mouth
                 <path d="M-6 8 Q 0 3, 6 8" fill="none" stroke={colorStroke} strokeWidth="2" strokeLinecap="round" />
             ) : (
                 // Happy/Neutral Mouth
                 <path d="M-6 5 Q 0 10, 6 5" fill="none" stroke={colorStroke} strokeWidth="2" strokeLinecap="round" />
             )}
             <ellipse cx="0" cy="0" rx="3.5" ry="2.5" fill={colorPink} />
          </g>
          
          {/* Paws */}
          {emotion === 'peeking' && (
              <g transform="translate(0, 45)">
                 <ellipse cx="45" cy="150" rx="16" ry="12" fill="white" stroke={colorStroke} strokeWidth="2" />
                 <ellipse cx="155" cy="150" rx="16" ry="12" fill="white" stroke={colorStroke} strokeWidth="2" />
              </g>
          )}
          
          {emotion === 'shy' && (
               <g>
                 <ellipse cx="60" cy="145" rx="16" ry="12" fill="white" stroke={colorStroke} strokeWidth="2" />
                 <ellipse cx="140" cy="145" rx="16" ry="12" fill="white" stroke={colorStroke} strokeWidth="2" />
              </g>
          )}

        </g>
      </svg>
    </div>
  );
};

export const SparkleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-400 animate-pulse">
    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
  </svg>
);