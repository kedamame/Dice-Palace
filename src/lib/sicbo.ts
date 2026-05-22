export type DieFace = 1 | 2 | 3 | 4 | 5 | 6;
export type Dice = [DieFace, DieFace, DieFace];

export type BetCategory = 'bigsmall' | 'sum' | 'single' | 'double' | 'triple';

export type Bet =
  | { category: 'bigsmall'; choice: 'big' | 'small' }
  | { category: 'sum'; value: number }
  | { category: 'single'; value: DieFace }
  | { category: 'double'; value: DieFace }
  | { category: 'triple'; value: DieFace | 'any' };

export function rollDice(): Dice {
  return [
    (Math.floor(Math.random() * 6) + 1) as DieFace,
    (Math.floor(Math.random() * 6) + 1) as DieFace,
    (Math.floor(Math.random() * 6) + 1) as DieFace,
  ];
}

const SUM_PAYOUTS: Record<number, number> = {
  4: 60, 5: 30, 6: 17, 7: 12, 8: 8, 9: 6, 10: 6,
  11: 6, 12: 6, 13: 8, 14: 12, 15: 17, 16: 30, 17: 60,
};

export function getSumPayoutLabel(sum: number): string {
  return SUM_PAYOUTS[sum] ? `${SUM_PAYOUTS[sum]}x` : '';
}

export interface BetResult {
  won: boolean;
  payout: number;
  description: string;
}

export function calculateResult(bet: Bet, betAmount: number, dice: Dice): BetResult {
  const sum = dice[0] + dice[1] + dice[2];
  const isTriple = dice[0] === dice[1] && dice[1] === dice[2];

  switch (bet.category) {
    case 'bigsmall': {
      if (isTriple) return { won: false, payout: 0, description: `Triple ${dice[0]} - House wins` };
      const isBig = sum >= 11;
      const won = (bet.choice === 'big') === isBig;
      // payout = total returned (original bet + profit). 1:1 → 2× total return.
      return { won, payout: won ? betAmount * 2 : 0, description: `Sum ${sum} - ${isBig ? 'BIG' : 'SMALL'}` };
    }
    case 'sum': {
      const won = sum === bet.value;
      return {
        won,
        payout: won ? betAmount * (SUM_PAYOUTS[bet.value] ?? 0) : 0,
        description: `Sum ${sum}`,
      };
    }
    case 'single': {
      const count = dice.filter(d => d === bet.value).length;
      if (count === 0) return { won: false, payout: 0, description: `No ${bet.value}s rolled` };
      // payout = total returned. 1 match→1:1 (2×), 2 match→2:1 (3×), 3 match→3:1 (4×).
      return { won: true, payout: betAmount * (count + 1), description: `${count} x ${bet.value} (${count}:1)` };
    }
    case 'double': {
      const count = dice.filter(d => d === bet.value).length;
      const won = count >= 2;
      return {
        won,
        payout: won ? betAmount * 10 : 0,
        description: won ? `Double ${bet.value} hit! (10x)` : `No double ${bet.value}`,
      };
    }
    case 'triple': {
      if (bet.value === 'any') {
        return {
          won: isTriple,
          payout: isTriple ? betAmount * 30 : 0,
          description: isTriple ? `Triple ${dice[0]}! (30x)` : 'No triple',
        };
      }
      const won = isTriple && dice[0] === bet.value;
      return {
        won,
        payout: won ? betAmount * 180 : 0,
        description: won ? `Triple ${bet.value}! (180x)` : `No triple ${bet.value}`,
      };
    }
  }
}

export function getBetLabel(bet: Bet): string {
  switch (bet.category) {
    case 'bigsmall': return bet.choice === 'big' ? 'BIG (11-17) - 1:1' : 'SMALL (4-10) - 1:1';
    case 'sum': return `SUM ${bet.value} - ${SUM_PAYOUTS[bet.value]}x`;
    case 'single': return `SINGLE ${bet.value} - 1-3x`;
    case 'double': return `DOUBLE ${bet.value}${bet.value} - 10x`;
    case 'triple': return bet.value === 'any' ? 'ANY TRIPLE - 30x' : `TRIPLE ${bet.value}${bet.value}${bet.value} - 180x`;
  }
}
