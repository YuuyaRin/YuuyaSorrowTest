export enum AppStage {
  LOCKED = 'LOCKED',         // Initial state, mystery box
  RESISTANCE = 'RESISTANCE', // The "No" button runs away
  TRANSITION = 'TRANSITION', // Emotional shift, background darkens
  GENERATING = 'GENERATING', // Calling Gemini
  REVEAL = 'REVEAL',         // Showing the letter
  ACCEPTED = 'ACCEPTED'      // Success state with confetti
}

export interface ApologyContent {
  title: string;
  body: string;
}
