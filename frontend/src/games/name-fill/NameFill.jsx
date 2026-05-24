// components/renderers/NameFill.jsx
// Renderer for the name-fill minigame.
// Displays letter cells directly — no visible input box.
// A hidden input captures keyboard events. Tapping a blank cell moves the cursor there.
// Revealed letters are fixed. Blanks are filled one by one.

import { useState, useRef, useEffect, useCallback } from 'react';
import '../../games/name-fill/name-fill.css';

/**
 * Builds the initial cell list from the hint array.
 * Each cell: { type: 'revealed' | 'blank' | 'space', char: string | null, blankIndex: number | null }
 * blankIndex is a sequential index across blank cells only, used to map typed chars.
 */
function buildCells(hint) {
  let blankIndex = 0;
  return hint.map((h) => {
    if (h === ' ')  return { type: 'space',    char: ' ',          blankIndex: null };
    if (h !== '_')  return { type: 'revealed', char: h.toUpperCase(), blankIndex: null };
    return           { type: 'blank',    char: null,         blankIndex: blankIndex++ };
  });
}

export default function NameFill({ spriteUrl, hint, displayName, onAnswer, disabled }) {
  const totalBlanks = hint.filter((h) => h === '_').length;

  // typed: array of chars indexed by blankIndex
  const [typed, setTyped]       = useState(() => Array(totalBlanks).fill(null));
  const [cursor, setCursor]     = useState(0); // which blankIndex is active
  const hiddenInputRef          = useRef(null);
  const cells                   = buildCells(hint);

  // Focus hidden input on mount
  useEffect(() => {
    hiddenInputRef.current?.focus();
  }, []);

  const focusInput = () => hiddenInputRef.current?.focus();

  // Find next empty blank from a given blankIndex
  function nextEmpty(from, arr) {
    for (let i = from; i < totalBlanks; i++) {
      if (!arr[i]) return i;
    }
    // if all filled, stay at last blank
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
        // If current cursor is empty, delete previous
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

        // Auto-submit when all blanks are filled
        const allFilled = next.every((c) => c !== null);
        if (allFilled) {
          const word = buildAnswer(next, cells);
          setTimeout(() => onAnswer(word), 120);
        }

        return next;
      });
    }
  }, [cursor, typed, disabled, cells, onAnswer]);

  function buildAnswer(typedArr, cellList) {
    let blankIdx = 0;
    return cellList.map((cell) => {
      if (cell.type === 'space')    return ' ';
      if (cell.type === 'revealed') return cell.char;
      return typedArr[blankIdx++] ?? '';
    }).join('');
  }

  function handleCellClick(blankIndex) {
    if (disabled) return;
    setCursor(blankIndex);
    focusInput();
  }

  return (
    <div className="nf-container" onClick={focusInput}>
      {spriteUrl && (
        <img
          className="nf-sprite"
          src={spriteUrl}
          alt="Pokemon sprite"
          draggable={false}
        />
      )}

      {/* Hidden input to capture keyboard */}
      <input
        ref={hiddenInputRef}
        className="nf-hidden-input"
        onKeyDown={handleKeyDown}
        onChange={() => {}} // controlled — suppress React warning
        value=""
        readOnly
        disabled={disabled}
        aria-label="Type the Pokemon name"
      />

      {/* Letter cells */}
      <div className="nf-hint">
        {cells.map((cell, i) => {
          if (cell.type === 'space') {
            return <span key={i} className="nf-space" />;
          }
          if (cell.type === 'revealed') {
            return (
              <span key={i} className="nf-cell nf-cell--revealed">
                {cell.char}
              </span>
            );
          }
          // blank cell
          const isCursor = cell.blankIndex === cursor && !disabled;
          const typedChar = typed[cell.blankIndex];
          return (
            <span
              key={i}
              className={`nf-cell nf-cell--blank ${typedChar ? 'nf-cell--typed' : ''} ${isCursor ? 'nf-cell--cursor' : ''}`}
              onClick={() => handleCellClick(cell.blankIndex)}
            >
              {typedChar ?? ''}
            </span>
          );
        })}
      </div>

      {/* Submit button */}
      <button
        className="nf-submit"
        onClick={() => { const word = buildAnswer(typed, cells); if (word.includes('')) return; onAnswer(word); }}
        disabled={disabled || typed.some((c) => !c)}
      >
        OK
      </button>
    </div>
  );
}