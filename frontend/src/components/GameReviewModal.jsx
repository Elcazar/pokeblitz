// components/GameReviewModal.jsx
// Modal that shows a past minigame in disabled/review mode.
// Opened from the GameOverScreen history list.

import { useLang } from '../context/LanguageContext.jsx';
import GameRenderer from './renderers/GameRenderer.jsx';
import '../styles/game-review-modal.css';

export default function GameReviewModal({ entry, onClose }) {
  const { lang } = useLang();

  if (!entry) return null;

  const game = {
    id: entry.gameId,
    instruction: entry.instruction,
    component: entry.component,
    props: entry.props,
    validate: () => false,
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <span className={`modal-result modal-result--${entry.result}`}>
            {entry.result === 'win' ? '✓' : '✗'}
          </span>
          <p className="modal-instruction">{entry.instruction?.[lang]}</p>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-game-area">
          <div className="modal-renderer-wrap">
            <GameRenderer
              game={game}
              lang={lang}
              onAnswer={() => {}}
              disabled={true}
            />
          </div>
        </div>

      </div>
    </div>
  );
}