// components/renderers/GameRenderer.jsx
// Dispatches a microgame instance to the correct renderer component.
// When adding a new renderer, import it here and add it to RENDERERS.
//
// Props:
//   game     : MicrogameInstance  - current microgame from the registry
//   lang     : 'en' | 'es'       - current language
//   onAnswer : (answer) => void   - called when the player submits an answer
//   disabled : boolean            - true while result is being shown

import TypeQuiz from '../../games/type-quiz/TypeQuiz.jsx';
import NameFill from '../../games/name-fill/NameFill.jsx';

// Keys must match the 'component' field returned by each microgame's build()
const RENDERERS = {
  TypeQuiz,
  NameFill,
};

export default function GameRenderer({ game, lang, onAnswer, disabled }) {
  if (!game) return null;

  const Component = RENDERERS[game.component];

  if (!Component) {
    console.error(`No renderer found for component type: "${game.component}"`);
    return null;
  }

  return (
    <Component
      {...game.props}
      onAnswer={onAnswer}
      disabled={disabled}
      lang={lang}
    />
  );
}