import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Danışmanım | Yurtdışı Eğitim Danışmanlığı';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Open Graph image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
          position: 'relative',
        }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '500px',
            height: '500px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px',
            zIndex: 10,
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              width: '140px',
              height: '140px',
              background: 'white',
              borderRadius: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontSize: '100px',
                fontWeight: 900,
                fontStyle: 'italic',
                letterSpacing: '-0.05em',
                color: '#0D9488',
                textShadow: '0 4px 8px rgba(13, 148, 136, 0.2)',
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
                width: '30px',
                height: '30px',
                background: 'rgba(13, 148, 136, 0.1)',
                borderBottomLeftRadius: '30px',
                display: 'flex',
              }}
            />
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px',
              display: 'flex',
            }}
          >
            Danışmanım
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '36px',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '30px',
              display: 'flex',
            }}
          >
            Yurtdışı Eğitim Danışmanlığı
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '800px',
              lineHeight: 1.4,
              display: 'flex',
            }}
          >
            Yeni Zelanda başta olmak üzere dünyanın farklı ülkelerinde
            profesyonel eğitim danışmanlığı
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
          }}
        >
          danismanim.co
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
