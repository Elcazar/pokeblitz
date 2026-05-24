// components/renderers/GameRenderer.jsx
// Dispatches a microgame instance to the correct renderer component.
// When adding a new renderer, import it here and add it to RENDERERS.

import TypeQuiz from '../../games/type-quiz/TypeQuiz.jsx';
import NameFill from '../../games/name-fill/NameFill.jsx';
import OddType from '../../games/odd-type/OddType.jsx';
import TypeMatchup from '../../games/type-matchup/TypeMatchup.jsx';
import SuperEffective from '../../games/super-effective/SuperEffective.jsx';

const RENDERERS = {
  TypeQuiz,
  NameFill,
  OddType,
  TypeMatchup,
  SuperEffective,
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