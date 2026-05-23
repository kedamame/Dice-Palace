'use client';

import { useState, useCallback, useRef } from 'react';
import { DiceDisplay } from './DiceDisplay';
import { BettingPanel } from './BettingPanel';
import { GameOverScreen } from './GameOverScreen';
import {
  type Bet,
  type Dice,
  rollDice,
  calculateResult,
  getBetLabel,
} from '@/lib/sicbo';
import { useFarcasterMiniApp } from '@/lib/farcaster';

type GamePhase = 'betting' | 'rolling' | 'result' | 'gameover';

const INITIAL_TOKENS = 100;

interface LastResult {
  won: boolean;
  net: number;
  description: string;
}

export function SicBoGame() {
  const { isInMiniApp } = useFarcasterMiniApp();

  const [tokens, setTokens] = useState(INITIAL_TOKENS);
  const [peakTokens, setPeakTokens] = useState(INITIAL_TOKENS);
  const [round, setRound] = useState(1);
  const [phase, setPhase] = useState<GamePhase>('betting');
  const [dice, setDice] = useState<Dice>([1, 1, 1]);
  const [animDice, setAnimDice] = useState<Dice>([1, 1, 1]);
  const [activeBet, setActiveBet] = useState<Bet | null>(null);
  const [betAmount, setBetAmount] = useState(1);
  const [lastResult, setLastResult] = useState<LastResult | null>(null);

  const rollingRef = useRef(false);
  const resultTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canRoll = activeBet !== null && betAmount > 0 && betAmount <= tokens && phase === 'betting';

  const handleRoll = useCallback(() => {
    if (!canRoll || !activeBet || rollingRef.current) return;
    rollingRef.current = true;

    const capturedBet = activeBet;
    const capturedAmount = betAmount;
    const capturedTokens = tokens;
    const capturedPeak = peakTokens;

    setPhase('rolling');

    let count = 0;
    const interval = setInterval(() => {
      count++;
      setAnimDice(rollDice());
      if (count >= 14) {
        clearInterval(interval);
        const finalDice = rollDice();
        const result = calculateResult(capturedBet, capturedAmount, finalDice);
        const net = result.payout - capturedAmount;
        const newTokens = Math.max(0, capturedTokens + net);
        const newPeak = Math.max(capturedPeak, newTokens);

        setDice(finalDice);
        setAnimDice(finalDice);
        setTokens(newTokens);
        setPeakTokens(newPeak);
        setLastResult({ won: result.won, net, description: result.description });
        setPhase('result');

        resultTimerRef.current = setTimeout(() => {
          resultTimerRef.current = null;
          rollingRef.current = false;
          if (newTokens <= 0) {
            setPhase('gameover');
          } else {
            setRound(r => r + 1);
            setLastResult(null);
            setPhase('betting');
          }
        }, 2500);
      }
    }, 75);
  }, [canRoll, activeBet, betAmount, tokens, peakTokens]);

  const handlePlayAgain = useCallback(() => {
    if (resultTimerRef.current) {
      clearTimeout(resultTimerRef.current);
      resultTimerRef.current = null;
    }
    rollingRef.current = false;
    setTokens(INITIAL_TOKENS);
    setPeakTokens(INITIAL_TOKENS);
    setRound(1);
    setPhase('betting');
    setDice([1, 1, 1]);
    setAnimDice([1, 1, 1]);
    setActiveBet(null);
    setBetAmount(1);
    setLastResult(null);
  }, []);

  const displayDice = phase === 'rolling' ? animDice : dice;
  const isRolling = phase === 'rolling';

  if (phase === 'gameover') {
    return (
      <GameOverScreen
        score={peakTokens}
        onPlayAgain={handlePlayAgain}
        isInMiniApp={isInMiniApp}
      />
    );
  }

  return (
    <div className="game-container">
      <header className="game-header">
        <div className="header-brand">
          <div className="header-ornament">-</div>
          <h1 className="header-title">DICE PALACE</h1>
          <div className="header-ornament">-</div>
        </div>
        <div className="header-info">
          <div className="info-item">
            <span className="info-label">TOKENS</span>
            <span className="info-value">{tokens.toLocaleString()}</span>
          </div>
          <div className="info-divider" />
          <div className="info-item">
            <span className="info-label">ROUND</span>
            <span className="info-value">{round}</span>
          </div>
        </div>
      </header>

      <section className="dice-section">
        <DiceDisplay dice={displayDice} isRolling={isRolling} />
        {!isRolling && (
          <div className="sum-display">
            <span className="sum-label">SUM</span>
            <span className="sum-value">{displayDice[0] + displayDice[1] + displayDice[2]}</span>
          </div>
        )}
      </section>

      {lastResult && phase === 'result' && (
        <div className={`result-banner${lastResult.won ? ' win' : ' lose'}`}>
          <span className="result-desc">{lastResult.description}</span>
          <span className="result-amount">
            {lastResult.won
              ? `+${lastResult.net.toLocaleString()}`
              : `-${Math.abs(lastResult.net).toLocaleString()}`}
          </span>
        </div>
      )}

      <section className="betting-section">
        {activeBet && phase === 'betting' && (
          <div className="active-bet-display">
            <span className="active-bet-label">BET</span>
            <span className="active-bet-value">{getBetLabel(activeBet)}</span>
          </div>
        )}
        <BettingPanel
          activeBet={activeBet}
          betAmount={betAmount}
          tokens={tokens}
          onBetChange={setActiveBet}
          onAmountChange={setBetAmount}
          disabled={phase !== 'betting'}
        />
      </section>

      <div className="roll-section">
        <button
          className={`roll-btn${canRoll ? ' active' : ' inactive'}`}
          onClick={handleRoll}
          disabled={!canRoll}
        >
          {phase === 'rolling' ? 'ROLLING...' : 'ROLL THE DICE'}
        </button>
      </div>
    </div>
  );
}
