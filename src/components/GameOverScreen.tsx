'use client';

import {
  useAccount,
  useConnect,
  useSendTransaction,
  useSwitchChain,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { base } from 'wagmi/chains';
import { encodeRecordScore } from '@/lib/attribution';
import { CONTRACT_ADDRESS } from '@/lib/contract';

interface GameOverScreenProps {
  rounds: number;
  onPlayAgain: () => void;
  isInMiniApp: boolean;
}

export function GameOverScreen({ rounds, onPlayAgain, isInMiniApp }: GameOverScreenProps) {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { switchChainAsync, isPending: isSwitching } = useSwitchChain();
  const { sendTransaction, data: txHash, isPending: isSending, error: txError } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash });

  const isContractDeployed = CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000';
  const isOnBase = chain?.id === base.id;

  const handleRecordScore = async () => {
    if (!isContractDeployed) return;
    if (!isOnBase) {
      try {
        await switchChainAsync({ chainId: base.id });
      } catch {
        return;
      }
    }
    const tx = encodeRecordScore(rounds);
    sendTransaction(tx);
  };

  const connectorName = (id: string) => {
    if (id === 'injected') return isInMiniApp ? 'Farcaster Wallet' : 'Browser Wallet';
    if (id === 'coinbaseWalletSDK') return 'Coinbase Wallet';
    if (id === 'walletConnect') return 'WalletConnect';
    return id;
  };

  return (
    <div className="gameover-screen">
      <div className="gameover-content">
        <div className="gameover-title-area">
          <div className="gameover-divider" />
          <h1 className="gameover-title">GAME OVER</h1>
          <div className="gameover-divider" />
        </div>

        <div className="gameover-score">
          <span className="score-label">ROUNDS SURVIVED</span>
          <span className="score-value">{rounds}</span>
        </div>

        {isContractDeployed ? (
          <div className="record-section">
            {!isConnected ? (
              <div className="wallet-connect">
                <p className="record-prompt">Connect wallet to record your score on Base</p>
                <div className="connector-list">
                  {connectors.map(c => (
                    <button key={c.id} className="connector-btn" onClick={() => connect({ connector: c })}>
                      {connectorName(c.id)}
                    </button>
                  ))}
                </div>
              </div>
            ) : isConfirmed ? (
              <div className="tx-success">
                <p className="tx-success-text">SCORE RECORDED ON-CHAIN</p>
                {txHash && (
                  <a
                    href={`https://basescan.org/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tx-link"
                  >
                    View on Basescan
                  </a>
                )}
              </div>
            ) : (
              <div className="record-action">
                <p className="wallet-info">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                  {!isOnBase && <span className="chain-warning"> (not on Base)</span>}
                </p>
                <button
                  className="record-btn"
                  onClick={handleRecordScore}
                  disabled={isSwitching || isSending || isConfirming}
                >
                  {isSwitching
                    ? 'SWITCHING TO BASE...'
                    : isSending
                    ? 'CONFIRM IN WALLET...'
                    : isConfirming
                    ? 'CONFIRMING...'
                    : 'RECORD SCORE ON-CHAIN'}
                </button>
                {txError && (
                  <p className="tx-error">
                    {txError.message.length > 80
                      ? txError.message.slice(0, 80) + '...'
                      : txError.message}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="record-prompt" style={{ textAlign: 'center', opacity: 0.5 }}>
            Deploy the contract to enable on-chain score recording
          </p>
        )}

        <button className="play-again-btn" onClick={onPlayAgain}>
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}
