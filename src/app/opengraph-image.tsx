import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const alt = 'Nowruz Countdown | شمارش معکوس نوروز';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const bold = readFileSync(join(process.cwd(), 'public/fonts/Vazirmatn-Bold.ttf'));
  const black = readFileSync(join(process.cwd(), 'public/fonts/Vazirmatn-Black.ttf'));

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
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #ec4899 100%)',
          color: '#ffffff',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>🌱</div>
        <div style={{ fontSize: 64, fontWeight: 900, letterSpacing: -1, marginBottom: 24 }}>
          تا لحظه تحویل سال
        </div>
        <div style={{ fontSize: 36, fontWeight: 700, opacity: 0.9 }}>
          Nowruz Countdown · شمارش معکوس نوروز ۱۴۰۵
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Vazirmatn', data: bold, weight: 700, style: 'normal' },
        { name: 'Vazirmatn', data: black, weight: 900, style: 'normal' },
      ],
    },
  );
}