// screens/InterludeScreen.jsx
// Brief screen shown between every microgame.
// Displays the result of the last game, current lives and streak.

import { MAX_LIVES } from '../engine/constants.js';

const COPY = {
  win: { en: 'Nice!',  es: 'Bien!' },
  lose: { en: 'Oops!', es: 'Vaya!' },
  streak: { en: 'Streak', es: 'Racha' },
};

export default function InterludeScreen({ state, lang }) {
  const { lastResult, lives, streak } = state;
  const isWin = lastResult === 'win';
  const copy = COPY[lastResult] ?? COPY.win;

  return (
    <div className={`interlude-screen interlude-screen--${lastResult}`}>
      <div className="interlude-result">{copy[lang]}</div>

      <div className="interlude-lives">
        {Array.from({ length: MAX_LIVES }).map((_, i) => (
          <span key={i} className={`heart ${i < lives ? 'heart--full' : 'heart--empty'}`}>
            {i < lives ? '♥' : '♡'}
          </span>
        ))}
      </div>

      {isWin && streak >= 2 && (
        <div className="interlude-streak">
          {COPY.streak[lang]}: {streak}
        </div>
      )}
    </div>
  );
}