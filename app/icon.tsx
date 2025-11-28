import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

// Icon generation
export default function Icon() {
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
          borderRadius: '6px',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: 'white',
            fontWeight: 900,
            fontStyle: 'italic',
            letterSpacing: '-0.05em',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
            width: '10px',
            height: '10px',
            background: 'rgba(255,255,255,0.2)',
            borderBottomLeftRadius: '10px',
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
