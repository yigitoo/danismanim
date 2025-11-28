import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Danışmanım | Yurtdışı Eğitim Danışmanlığı';
export const size = {
  width: 1200,
  height: 600,
};

export const contentType = 'image/png';

// Twitter card image generation
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
              width: '120px',
              height: '120px',
              background: 'white',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '30px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontSize: '86px',
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
                width: '26px',
                height: '26px',
                background: 'rgba(13, 148, 136, 0.1)',
                borderBottomLeftRadius: '26px',
                display: 'flex',
              }}
            />
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '16px',
              display: 'flex',
            }}
          >
            Danışmanım
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '32px',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '24px',
              display: 'flex',
            }}
          >
            Yurtdışı Eğitim Danışmanlığı
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '22px',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '700px',
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
            bottom: '30px',
            fontSize: '18px',
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
