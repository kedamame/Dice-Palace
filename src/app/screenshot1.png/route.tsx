import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Screenshot 1: Main game screen (betting phase)
export async function GET() {
  const BG = '#2a2520';
  const BG2 = '#1e1a16';
  const GOLD = '#c8914a';
  const GOLD_DIM = '#9a6d35';
  const BORDER = 'rgba(200,145,74,0.25)';
  const TEXT = '#f5f0e8';
  const MUTED = '#6b5d52';
  const SECONDARY = '#b8a99a';
  const CARD = '#322a1f';

  const Die = ({ val, x }: { val: number; x: number }) => {
    const dots: [number, number][][] = [
      [],
      [[50, 50]],
      [[25, 25], [75, 75]],
      [[25, 25], [50, 50], [75, 75]],
      [[25, 25], [75, 25], [25, 75], [75, 75]],
      [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
      [[25, 20], [75, 20], [25, 50], [75, 50], [25, 80], [75, 80]],
    ];
    const size = 160;
    return (
      <div
        style={{
          position: 'absolute',
          left: x,
          top: 0,
          width: size,
          height: size,
          background: '#1a1714',
          border: `4px solid ${GOLD}`,
          borderRadius: 22,
          display: 'flex',
        }}
      >
        {dots[val].map(([cx, cy], i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: GOLD,
              left: `${cx}%`,
              top: `${cy}%`,
              marginLeft: -11,
              marginTop: -11,
            }}
          />
        ))}
      </div>
    );
  };

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: BG, fontFamily: 'sans-serif' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', background: BG2, borderBottom: `1px solid ${BORDER}`, padding: '32px 40px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginBottom: 16 }}>
            <div style={{ color: GOLD_DIM, fontSize: 32, display: 'flex' }}>-</div>
            <div style={{ color: GOLD, fontSize: 62, fontWeight: 700, letterSpacing: 14, fontFamily: 'serif', display: 'flex' }}>DICE PALACE</div>
            <div style={{ color: GOLD_DIM, fontSize: 32, display: 'flex' }}>-</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 50 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ fontSize: 20, letterSpacing: 6, color: MUTED, display: 'flex' }}>CHIPS</div>
              <div style={{ fontSize: 52, color: '#e8b570', fontWeight: 700, fontFamily: 'serif', display: 'flex' }}>1,000</div>
            </div>
            <div style={{ width: 1, height: 60, background: BORDER, display: 'flex' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ fontSize: 20, letterSpacing: 6, color: MUTED, display: 'flex' }}>ROUND</div>
              <div style={{ fontSize: 52, color: '#e8b570', fontWeight: 700, fontFamily: 'serif', display: 'flex' }}>1</div>
            </div>
          </div>
        </div>

        {/* Dice */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: BG2, borderBottom: `1px solid ${BORDER}`, padding: '40px 40px 28px' }}>
          <div style={{ position: 'relative', display: 'flex', width: 560, height: 160, marginBottom: 20 }}>
            <Die val={2} x={0} />
            <Die val={5} x={200} />
            <Die val={3} x={400} />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <div style={{ fontSize: 22, letterSpacing: 6, color: MUTED, display: 'flex' }}>SUM</div>
            <div style={{ fontSize: 48, color: SECONDARY, fontWeight: 700, fontFamily: 'serif', display: 'flex' }}>10</div>
          </div>
        </div>

        {/* Betting area */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '32px 36px', gap: 24 }}>
          {/* Active bet */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', background: 'rgba(200,145,74,0.07)', border: `1px solid ${BORDER}`, borderRadius: 6 }}>
            <div style={{ fontSize: 20, letterSpacing: 6, color: MUTED, display: 'flex' }}>BET</div>
            <div style={{ fontSize: 24, color: GOLD, letterSpacing: 4, display: 'flex' }}>BIG (11-17) - 1:1</div>
          </div>

          {/* Bet tabs */}
          <div style={{ display: 'flex', gap: 6 }}>
            {['BIG/SMALL', 'SUM', 'SINGLE', 'DOUBLE', 'TRIPLE'].map((tab, i) => (
              <div
                key={tab}
                style={{
                  padding: '12px 18px',
                  fontSize: 18,
                  letterSpacing: 3,
                  color: i === 0 ? GOLD : MUTED,
                  border: `1px solid ${i === 0 ? GOLD_DIM : 'transparent'}`,
                  background: i === 0 ? 'rgba(200,145,74,0.08)' : 'transparent',
                  borderRadius: 4,
                  display: 'flex',
                }}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Big/Small buttons */}
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { label: 'BIG', detail: 'Sum 11-17 · 1:1', sel: true },
              { label: 'SMALL', detail: 'Sum 4-10 · 1:1', sel: false },
            ].map(btn => (
              <div
                key={btn.label}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '28px 20px',
                  background: btn.sel ? 'rgba(200,145,74,0.18)' : CARD,
                  border: `1px solid ${btn.sel ? GOLD : BORDER}`,
                  borderRadius: 6,
                  gap: 8,
                }}
              >
                <div style={{ fontSize: 52, fontWeight: 700, color: TEXT, fontFamily: 'serif', letterSpacing: 8, display: 'flex' }}>{btn.label}</div>
                <div style={{ fontSize: 20, color: GOLD, letterSpacing: 4, display: 'flex' }}>{btn.detail}</div>
              </div>
            ))}
          </div>

          {/* Amount */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 20, letterSpacing: 6, color: MUTED, display: 'flex' }}>BET AMOUNT</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[10, 25, 50, 100, 500, 'MAX'].map((amt, i) => (
                <div
                  key={String(amt)}
                  style={{
                    padding: '14px 22px',
                    fontSize: 26,
                    fontFamily: 'serif',
                    color: i === 0 ? GOLD : SECONDARY,
                    background: CARD,
                    border: `1px solid ${i === 0 ? GOLD : BORDER}`,
                    borderRadius: 4,
                    display: 'flex',
                  }}
                >
                  {amt}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Roll button */}
        <div style={{ padding: '28px 36px', background: BG2, borderTop: `1px solid ${BORDER}`, display: 'flex' }}>
          <div
            style={{
              width: '100%',
              padding: '30px',
              background: GOLD,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              fontWeight: 700,
              color: BG2,
              fontFamily: 'serif',
              letterSpacing: 12,
            }}
          >
            ROLL THE DICE
          </div>
        </div>
      </div>
    ),
    { width: 1284, height: 2778 }
  );
}
