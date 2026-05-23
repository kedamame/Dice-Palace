'use client';

import { useState } from 'react';
import { type Bet, type BetCategory, type DieFace, getSumPayoutLabel } from '@/lib/sicbo';

interface BettingPanelProps {
  activeBet: Bet | null;
  betAmount: number;
  tokens: number;
  onBetChange: (bet: Bet) => void;
  onAmountChange: (amount: number) => void;
  disabled: boolean;
}

const AMOUNT_PRESETS = [1, 5, 10, 25];
const DIE_VALUES: DieFace[] = [1, 2, 3, 4, 5, 6];
const TABS: { id: BetCategory; label: string }[] = [
  { id: 'bigsmall', label: 'BIG/SMALL' },
  { id: 'sum', label: 'SUM' },
  { id: 'single', label: 'SINGLE' },
  { id: 'double', label: 'DOUBLE' },
  { id: 'triple', label: 'TRIPLE' },
];

function isBetSelected(activeBet: Bet | null, bet: Bet): boolean {
  if (!activeBet || activeBet.category !== bet.category) return false;
  switch (bet.category) {
    case 'bigsmall':
      return activeBet.category === 'bigsmall' && activeBet.choice === bet.choice;
    case 'sum':
      return activeBet.category === 'sum' && activeBet.value === bet.value;
    case 'single':
      return activeBet.category === 'single' && activeBet.value === bet.value;
    case 'double':
      return activeBet.category === 'double' && activeBet.value === bet.value;
    case 'triple':
      if (activeBet.category !== 'triple') return false;
      return activeBet.value === bet.value;
  }
}

export function BettingPanel({
  activeBet,
  betAmount,
  tokens,
  onBetChange,
  onAmountChange,
  disabled,
}: BettingPanelProps) {
  const [activeTab, setActiveTab] = useState<BetCategory>('bigsmall');
  const sel = (bet: Bet) => isBetSelected(activeBet, bet);

  return (
    <div className="betting-panel">
      <div className="bet-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`bet-tab${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            disabled={disabled}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bet-options">
        {activeTab === 'bigsmall' && (
          <div className="bet-bigsmall">
            {(['big', 'small'] as const).map(choice => (
              <button
                key={choice}
                className={`bet-btn bigsmall-btn${sel({ category: 'bigsmall', choice }) ? ' selected' : ''}`}
                onClick={() => onBetChange({ category: 'bigsmall', choice })}
                disabled={disabled}
              >
                <span className="bet-name">{choice.toUpperCase()}</span>
                <span className="bet-detail">{choice === 'big' ? 'Sum 11-17' : 'Sum 4-10'} · 1:1</span>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'sum' && (
          <div className="bet-grid sum-grid">
            {Array.from({ length: 14 }, (_, i) => i + 4).map(sum => (
              <button
                key={sum}
                className={`bet-btn sum-btn${sel({ category: 'sum', value: sum }) ? ' selected' : ''}`}
                onClick={() => onBetChange({ category: 'sum', value: sum })}
                disabled={disabled}
              >
                <span className="bet-name">{sum}</span>
                <span className="bet-detail">{getSumPayoutLabel(sum)}</span>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'single' && (
          <div className="bet-grid die-grid">
            {DIE_VALUES.map(v => (
              <button
                key={v}
                className={`bet-btn die-btn${sel({ category: 'single', value: v }) ? ' selected' : ''}`}
                onClick={() => onBetChange({ category: 'single', value: v })}
                disabled={disabled}
              >
                <span className="bet-name">{v}</span>
                <span className="bet-detail">1-3x</span>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'double' && (
          <div className="bet-grid die-grid">
            {DIE_VALUES.map(v => (
              <button
                key={v}
                className={`bet-btn die-btn${sel({ category: 'double', value: v }) ? ' selected' : ''}`}
                onClick={() => onBetChange({ category: 'double', value: v })}
                disabled={disabled}
              >
                <span className="bet-name">{v}{v}</span>
                <span className="bet-detail">10x</span>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'triple' && (
          <div className="bet-triple">
            <button
              className={`bet-btn triple-any-btn${sel({ category: 'triple', value: 'any' }) ? ' selected' : ''}`}
              onClick={() => onBetChange({ category: 'triple', value: 'any' })}
              disabled={disabled}
            >
              <span className="bet-name">ANY TRIPLE</span>
              <span className="bet-detail">30x</span>
            </button>
            <div className="bet-grid die-grid">
              {DIE_VALUES.map(v => (
                <button
                  key={v}
                  className={`bet-btn die-btn${sel({ category: 'triple', value: v }) ? ' selected' : ''}`}
                  onClick={() => onBetChange({ category: 'triple', value: v })}
                  disabled={disabled}
                >
                  <span className="bet-name">{v}{v}{v}</span>
                  <span className="bet-detail">180x</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="amount-selector">
        <span className="amount-label">BET AMOUNT</span>
        <div className="amount-presets">
          {AMOUNT_PRESETS.map(preset => (
            <button
              key={preset}
              className={`amount-btn${betAmount === preset ? ' selected' : ''}`}
              onClick={() => onAmountChange(Math.min(preset, tokens))}
              disabled={disabled || tokens < preset}
            >
              {preset}
            </button>
          ))}
          <button
            className={`amount-btn max-btn${betAmount === tokens ? ' selected' : ''}`}
            onClick={() => onAmountChange(tokens)}
            disabled={disabled}
          >
            MAX
          </button>
        </div>
      </div>
    </div>
  );
}
