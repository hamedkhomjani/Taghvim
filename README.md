# Nowruz Countdown (تقویم و تبدیل تاریخ)

A modern, high-performance Nowruz countdown website built with Next.js 16, TailwindCSS, and Framer Motion.

Live: [taghvim-countdown.vercel.app](https://taghvim-countdown.vercel.app)

## 🚀 Features

- **Dynamic Countdown**: Accurate countdown to the exact moment of the Vernal Equinox (Nowruz), computed astronomically (Meeus algorithm) — no manual date updates needed.
- **Celebration Popup**: Automatic confetti celebration at the exact equinox moment.
- **Date Converter**: Jalali ↔ Gregorian conversion tool at `/converter`.
- **Modern UI/UX**: Glassmorphism design, smooth animations, and responsive layout.
- **Dark Mode**: Fully supported dark mode with persistent customization.
- **SEO Optimized**: Dynamic metadata, JSON-LD event schema, dynamic OG image, sitemap & robots.txt.
- **Shareable**: Integrated sharing options for Twitter/X, Telegram, and WhatsApp.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: `jalaali-js` & `Intl.DateTimeFormat`
- **Font**: Vazirmatn (self-hosted in `public/fonts/`, loaded via `next/font/google`)

## 📂 Project Structure

```bash
src/
├── app/
│   ├── globals.css          # Global styles & Tailwind theme
│   ├── layout.tsx           # Root layout with font, metadata & JSON-LD
│   ├── page.tsx             # Main landing page
│   ├── converter/page.tsx   # Jalali ↔ Gregorian converter page
│   ├── opengraph-image.tsx  # Dynamic 1200×630 OG image
│   ├── robots.ts            # robots.txt
│   └── sitemap.ts           # sitemap.xml
├── components/
│   ├── CountdownTimer.tsx   # The animated countdown component
│   ├── DateConverter.tsx    # Date converter tool
│   ├── Footer.tsx           # Site footer
│   ├── Hero.tsx             # Hero section with standard time display
│   ├── InfoSection.tsx      # History and traditions content
│   ├── NowruzPopup.tsx      # New Year celebration modal with confetti
│   ├── ShareButtons.tsx     # Social sharing functionality
│   ├── ThemeToggle.tsx      # Dark/Light mode switcher
│   └── icons/SocialIcons.tsx # Telegram/WhatsApp brand icons
├── config.ts                # Site URL and name constants
├── context/
│   └── NowruzContext.tsx    # Global countdown state provider
├── hooks/
│   └── useCountdown.ts      # Logic for calculating time remaining
└── utils/
    ├── date.ts              # Persian digit/date formatting helpers
    └── nowruzDates.ts       # Astronomical March equinox calculation
```

## 🚀 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  **Open** [http://localhost:3000](http://localhost:3000) with your browser.

## 🌍 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/):

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Vercel will detect Next.js and configure the build settings automatically.
4.  Click **Deploy**.

## 💡 Customization

-   **Site URL**: Update `SITE_URL` in `src/config.ts`.
-   **Nowruz dates**: Computed automatically in `src/utils/nowruzDates.ts` — no updates needed for future years.
-   **Content**: Edit `src/components/InfoSection.tsx` to change the text.
-   **Theme**: Modify `src/app/globals.css` to adjust colors and fonts.
