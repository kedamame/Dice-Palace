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
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2a2520',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 860,
            height: 860,
            border: '7px solid #c8914a',
            borderRadius: 110,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 28,
              marginBottom: 18,
            }}
          >
            {[4, 6, 5].map((val, dIdx) => {
              const dots: [number, number][][] = [
                [],
                [[50, 50]],
                [[25, 25], [75, 75]],
                [[25, 25], [50, 50], [75, 75]],
                [[25, 25], [75, 25], [25, 75], [75, 75]],
                [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
                [[25, 20], [75, 20], [25, 50], [75, 50], [25, 80], [75, 80]],
              ];
              const size = 180;
              return (
                <div
                  key={dIdx}
                  style={{
                    width: size,
                    height: size,
                    background: '#1a1714',
                    border: '4px solid #c8914a',
                    borderRadius: 26,
                    position: 'relative',
                    display: 'flex',
                  }}
                >
                  {dots[val].map(([cx, cy], i) => (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: '#c8914a',
                        left: `${cx}%`,
                        top: `${cy}%`,
                        marginLeft: -14,
                        marginTop: -14,
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
              fontSize: 72,
              fontWeight: 700,
              color: '#c8914a',
              letterSpacing: 18,
              fontFamily: 'serif',
            }}
          >
            DICE PALACE
          </div>
        </div>
      </div>
    ),
    { width: 1024, height: 1024 }
  );
}
