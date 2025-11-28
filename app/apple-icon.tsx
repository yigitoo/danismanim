import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

// Apple icon generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontSize: 140,
            color: 'white',
            fontWeight: 900,
            fontStyle: 'italic',
            letterSpacing: '-0.05em',
            textShadow: '0 4px 8px rgba(0,0,0,0.15)',
            display: 'flex',
          }}
        >
          D
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40px',
            height: '40px',
            background: 'rgba(255,255,255,0.15)',
            borderBottomLeftRadius: '40px',
            display: 'flex',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
