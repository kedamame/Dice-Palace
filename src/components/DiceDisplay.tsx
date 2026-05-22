'use client';

import type { Dice } from '@/lib/sicbo';

const DOT_POSITIONS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 22], [72, 22], [28, 50], [72, 50], [28, 78], [72, 78]],
};

function DieFace({ value, isRolling }: { value: number; isRolling: boolean }) {
  const dots = DOT_POSITIONS[value] ?? [];
  return (
    <div className={`die-wrapper${isRolling ? ' rolling' : ''}`}>
      <svg width="90" height="90" viewBox="0 0 100 100" className="die-svg">
        <rect x="3" y="3" width="94" height="94" rx="14" fill="#1a1714" stroke="#c8914a" strokeWidth="2.5" />
        {dots.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="7.5" fill="#c8914a" />
        ))}
      </svg>
    </div>
  );
}

export function DiceDisplay({ dice, isRolling }: { dice: Dice; isRolling: boolean }) {
  return (
    <div className="dice-row">
      {dice.map((value, i) => (
        <DieFace key={i} value={value} isRolling={isRolling} />
      ))}
    </div>
  );
}
