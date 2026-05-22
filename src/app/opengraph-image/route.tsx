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
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#c8914a', display: 'flex' }} />

        <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
          {[5, 2, 6].map((val, dIdx) => {
            const dots: [number, number][][] = [
              [],
              [[50, 50]],
              [[25, 25], [75, 75]],
              [[25, 25], [50, 50], [75, 75]],
              [[25, 25], [75, 25], [25, 75], [75, 75]],
              [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
              [[25, 20], [75, 20], [25, 50], [75, 50], [25, 80], [75, 80]],
            ];
            const size = 86;
            return (
              <div
                key={dIdx}
                style={{
                  width: size,
                  height: size,
                  background: '#1a1714',
                  border: '2px solid #c8914a',
                  borderRadius: 12,
                  position: 'relative',
                  display: 'flex',
                }}
              >
                {dots[val].map(([cx, cy], i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: 13,
                      height: 13,
                      borderRadius: '50%',
                      background: '#c8914a',
                      left: `${cx}%`,
                      top: `${cy}%`,
                      marginLeft: -6.5,
                      marginTop: -6.5,
                    }}
                  />
                ))}
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 68,
            fontWeight: 700,
            color: '#c8914a',
            letterSpacing: 16,
            fontFamily: 'serif',
          }}
        >
          DICE PALACE
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 20,
            color: '#b8a99a',
            letterSpacing: 7,
            fontFamily: 'sans-serif',
            marginTop: 14,
          }}
        >
          CLASSIC SIC BO ON BASE
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: '#c8914a', display: 'flex' }} />
      </div>
    ),
    { width: 900, height: 600 }
  );
}
