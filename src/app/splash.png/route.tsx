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
            gap: 8,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: '#1a1714',
              border: '2px solid #c8914a',
              borderRadius: 12,
              display: 'flex',
              position: 'relative',
            }}
          >
            {[[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]].map(([cx, cy], i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#c8914a',
                  left: `${cx}%`,
                  top: `${cy}%`,
                  marginLeft: -6,
                  marginTop: -6,
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontSize: 20,
              color: '#c8914a',
              letterSpacing: 4,
              fontFamily: 'serif',
              fontWeight: 700,
              display: 'flex',
            }}
          >
            DP
          </div>
        </div>
      </div>
    ),
    { width: 200, height: 200 }
  );
}
