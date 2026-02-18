import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Ask Her Marketing Group - Marketing That Actually Works'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#050505',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Pink glow blob top-left */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-80px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,46,147,0.25) 0%, transparent 70%)',
          }}
        />
        {/* Pink glow blob bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            right: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,46,147,0.18) 0%, transparent 70%)',
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #FF2E93, #C91C6F)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            zIndex: 1,
          }}
        >
          {/* Tagline eyebrow */}
          <div
            style={{
              color: '#FF2E93',
              fontSize: '18px',
              letterSpacing: '8px',
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
            }}
          >
            VOLUSIA COUNTY, FLORIDA
          </div>

          {/* Main title */}
          <div
            style={{
              color: '#ffffff',
              fontSize: '84px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontFamily: 'serif',
              lineHeight: 1,
            }}
          >
            ASK HER
          </div>
          <div
            style={{
              color: '#FF2E93',
              fontSize: '36px',
              fontWeight: 400,
              letterSpacing: '10px',
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
            }}
          >
            MARKETING GROUP
          </div>

          {/* Divider */}
          <div
            style={{
              width: '60px',
              height: '2px',
              background: '#FF2E93',
              marginTop: '6px',
            }}
          />

          {/* Tagline */}
          <div
            style={{
              color: '#888888',
              fontSize: '22px',
              letterSpacing: '1px',
              fontFamily: 'sans-serif',
            }}
          >
            Ask Her for Anything.
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
