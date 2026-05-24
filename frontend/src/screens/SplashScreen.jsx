// screens/SplashScreen.jsx
// Initial screen shown before the game starts.
// Displays the game title, language selector, and start button.

import { useLang } from '../context/LanguageContext.jsx';

const COPY = {
  en: {
    subtitle: 'Pokemon minigames',
    start: 'Play',
  },
  es: {
    subtitle: 'Minijuegos Pokemon',
    start: 'Jugar',
  },
};

export default function SplashScreen({ onStart }) {
  const { lang, toggleLang } = useLang();
  const copy = COPY[lang];

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <h1 className="splash-title">PokeBlitz</h1>
        <p className="splash-subtitle">{copy.subtitle}</p>
        <button className="btn-primary" onClick={onStart}>
          {copy.start}
        </button>
        <button className="btn-lang" onClick={toggleLang}>
          {lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
        </button>
      </div>
    </div>
  );
}