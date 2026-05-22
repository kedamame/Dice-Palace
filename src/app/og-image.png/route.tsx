import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2a2520',
          position: 'relative',
        }}
      >
        {/* Top line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#c8914a', display: 'flex' }} />

        {/* Dice row */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 36 }}>
          {[3, 6, 4].map((val, dIdx) => {
            const dots: [number, number][][] = [
              [],
              [[50, 50]],
              [[25, 25], [75, 75]],
              [[25, 25], [50, 50], [75, 75]],
              [[25, 25], [75, 25], [25, 75], [75, 75]],
              [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
              [[25, 20], [75, 20], [25, 50], [75, 50], [25, 80], [75, 80]],
            ];
            const size = 100;
            return (
              <div
                key={dIdx}
                style={{
                  width: size,
                  height: size,
                  background: '#1a1714',
                  border: '2.5px solid #c8914a',
                  borderRadius: 14,
                  position: 'relative',
                  display: 'flex',
                }}
              >
                {dots[val].map(([cx, cy], i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: '#c8914a',
                      left: `${cx}%`,
                      top: `${cy}%`,
                      marginLeft: -8,
                      marginTop: -8,
                    }}
                  />
                ))}
              </div>
            );
          })}
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            fontSize: 90,
            fontWeight: 700,
            color: '#c8914a',
            letterSpacing: 22,
            fontFamily: 'serif',
            lineHeight: 1,
          }}
        >
          DICE PALACE
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 20, marginBottom: 16 }}>
          <div style={{ width: 120, height: 1, background: 'rgba(200,145,74,0.4)', display: 'flex' }} />
          <div style={{ width: 6, height: 6, background: '#c8914a', borderRadius: '50%', display: 'flex' }} />
          <div style={{ width: 120, height: 1, background: 'rgba(200,145,74,0.4)', display: 'flex' }} />
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            color: '#b8a99a',
            letterSpacing: 10,
            fontFamily: 'sans-serif',
          }}
        >
          CLASSIC SIC BO ON BASE
        </div>

        {/* Bottom line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: '#c8914a', display: 'flex' }} />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
