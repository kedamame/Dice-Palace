import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Screenshot 3: Game Over screen
export async function GET() {
  const BG = '#2a2520';
  const BG2 = '#1e1a16';
  const GOLD = '#c8914a';
  const BORDER = 'rgba(200,145,74,0.25)';
  const MUTED = '#6b5d52';
  const SECONDARY = '#b8a99a';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: BG,
          padding: '80px 60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 60,
            width: '100%',
          }}
        >
          {/* Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 30, width: '100%' }}>
            <div style={{ flex: 1, height: 1, background: BORDER, display: 'flex' }} />
            <div style={{ fontSize: 80, fontWeight: 700, color: GOLD, fontFamily: 'serif', letterSpacing: 16, display: 'flex', whiteSpace: 'nowrap' }}>
              GAME OVER
            </div>
            <div style={{ flex: 1, height: 1, background: BORDER, display: 'flex' }} />
          </div>

          {/* Score box */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              padding: '60px 80px',
              border: `1px solid ${BORDER}`,
              background: BG2,
              width: '100%',
            }}
          >
            <div style={{ fontSize: 24, letterSpacing: 10, color: MUTED, display: 'flex' }}>ROUNDS SURVIVED</div>
            <div style={{ fontSize: 180, color: '#e8b570', fontFamily: 'serif', fontWeight: 400, lineHeight: 1, display: 'flex' }}>
              23
            </div>
          </div>

          {/* Record score button */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
            <div
              style={{
                width: '100%',
                padding: '40px',
                background: GOLD,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
                fontWeight: 700,
                color: BG2,
                fontFamily: 'serif',
                letterSpacing: 8,
              }}
            >
              RECORD SCORE ON-CHAIN
            </div>

            <div
              style={{
                width: '100%',
                padding: '40px',
                background: 'transparent',
                border: `1px solid ${GOLD}`,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
                fontWeight: 700,
                color: GOLD,
                fontFamily: 'serif',
                letterSpacing: 8,
              }}
            >
              PLAY AGAIN
            </div>
          </div>

          {/* Footer note */}
          <div style={{ fontSize: 22, color: SECONDARY, letterSpacing: 4, display: 'flex', opacity: 0.6 }}>
            POWERED BY BASE
          </div>
        </div>
      </div>
    ),
    { width: 1284, height: 2778 }
  );
}
