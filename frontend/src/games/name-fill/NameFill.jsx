// games/name-fill/NameFill.jsx
// Renderer for the name-fill minigame.
// In review mode (disabled=true), shows correct/wrong colors per cell.

import { useState, useRef, useEffect, useCallback } from 'react';
import './name-fill.css';

function buildCells(hint) {
  let blankIndex = 0;
  return hint.map((h) => {
    if (h === ' ')  return { type: 'space',    char: ' ',             blankIndex: null };
    if (h !== '_')  return { type: 'revealed', char: h.toUpperCase(), blankIndex: null };
    return           { type: 'blank',    char: null,            blankIndex: blankIndex++ };
  });
}

function buildAnswer(typedArr, cellList) {
  let blankIdx = 0;
  return cellList.map((cell) => {
    if (cell.type === 'space')    return ' ';
    if (cell.type === 'revealed') return cell.char;
    return typedArr[blankIdx++] ?? '';
  }).join('');
}

function getCorrectChars(hint, displayName) {
  const chars = displayName.toUpperCase().split('');
  const result = [];
  for (let i = 0; i < hint.length; i++) {
    if (hint[i] === '_') result.push(chars[i] ?? '');
  }
  return result;
}

export default function NameFill({ spriteUrl, hint, displayName, selectedAnswer, onAnswer, disabled }) {
  const totalBlanks = hint.filter((h) => h === '_').length;
  const cells = buildCells(hint);
  const correctChars = getCorrectChars(hint, displayName);

  const initialTyped = () => {
    if (selectedAnswer && typeof selectedAnswer === 'string') {
      const typed = Array(totalBlanks).fill(null);
      let blankIdx = 0;
      const answerChars = selectedAnswer.toUpperCase().split('');
      for (let i = 0; i < hint.length; i++) {
        if (hint[i] === '_') typed[blankIdx++] = answerChars[i] ?? null;
      }
      return typed;
    }
    return Array(totalBlanks).fill(null);
  };

  const [typed, setTyped]   = useState(initialTyped);
  const [cursor, setCursor] = useState(0);
  const hiddenInputRef      = useRef(null);

  useEffect(() => {
    if (!disabled) hiddenInputRef.current?.focus();
  }, [disabled]);

  const focusInput = () => hiddenInputRef.current?.focus();

  function nextEmpty(from, arr) {
    for (let i = from; i < totalBlanks; i++) {
      if (!arr[i]) return i;
    }
    return totalBlanks - 1;
  }

  const handleKeyDown = useCallback((e) => {
    if (disabled) return;

    if (e.key === 'Enter') {
      const word = buildAnswer(typed, cells);
      if (word) onAnswer(word);
      return;
    }

    if (e.key === 'Backspace') {
      setTyped((prev) => {
        const next = [...prev];
        const target = next[cursor] ? cursor : Math.max(0, cursor - 1);
        next[target] = null;
        setCursor(target);
        return next;
      });
      return;
    }

    if (e.key.length === 1 && /[a-zA-ZÀ-ÿ. -]/.test(e.key)) {
      e.preventDefault();
      setTyped((prev) => {
        const next = [...prev];
        next[cursor] = e.key.toUpperCase();
        const nextCursor = nextEmpty(cursor + 1, next);
        setCursor(nextCursor);

        const allFilled = next.every((c) => c !== null);
        if (allFilled) {
          const word = buildAnswer(next, cells);
          setTimeout(() => onAnswer(word), 120);
        }

        return next;
      });
    }
  }, [cursor, typed, disabled, cells, onAnswer]);

  function handleCellClick(blankIndex) {
    if (disabled) return;
    setCursor(blankIndex);
    focusInput();
  }

  function getBlankCellClass(blankIndex, typedChar) {
    if (!disabled) {
      const isCursor = blankIndex === cursor;
      return `nf-cell nf-cell--blank ${typedChar ? 'nf-cell--typed' : ''} ${isCursor ? 'nf-cell--cursor' : ''}`;
    }
    // Review mode
    if (!typedChar) return 'nf-cell nf-cell--blank';
    const isCorrect = typedChar === correctChars[blankIndex];
    return `nf-cell nf-cell--blank ${isCorrect ? 'nf-cell--correct' : 'nf-cell--wrong'}`;
  }

  return (
    <div className="nf-container" onClick={focusInput}>
      {spriteUrl && (
        <img className="nf-sprite" src={spriteUrl} alt="Pokemon sprite" draggable={false} />
      )}

      <input
        ref={hiddenInputRef}
        className="nf-hidden-input"
        onKeyDown={handleKeyDown}
        onChange={() => {}}
        value=""
        readOnly
        disabled={disabled}
        aria-label="Type the Pokemon name"
      />

      <div className="nf-hint">
        {cells.map((cell, i) => {
          if (cell.type === 'space') return <span key={i} className="nf-space" />;
          if (cell.type === 'revealed') {
            return <span key={i} className="nf-cell nf-cell--revealed">{cell.char}</span>;
          }
          const typedChar = typed[cell.blankIndex];
          return (
            <span
              key={i}
              className={getBlankCellClass(cell.blankIndex, typedChar)}
              onClick={() => handleCellClick(cell.blankIndex)}
            >
              {typedChar ?? (disabled ? correctChars[cell.blankIndex] : '')}
            </span>
          );
        })}
      </div>

      {!disabled && (
        <button
          className="nf-submit"
          onClick={() => { const word = buildAnswer(typed, cells); if (word.includes('')) return; onAnswer(word); }}
          disabled={typed.some((c) => !c)}
        >
          OK
        </button>
      )}
    </div>
  );
}