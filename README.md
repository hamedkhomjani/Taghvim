# Nowruz Countdown (1405 SH)

A modern, high-performance Nowruz countdown website built with Next.js 15, TailwindCSS, and Framer Motion.

## 🚀 Features

- **Dynamic Countdown**: Accurate countdown to the exact moment of the Vernal Equinox (Nowruz).
- **Modern UI/UX**: Glassmorphism design, smooth animations, and responsive layout.
- **Dark Mode**: Fully supported dark mode with persistent customization.
- **Persian & Gregorian Dates**: Automatic conversion and display.
- **SEO Optimized**: Semantic HTML and structured metadata.
- **Shareable**: Integrated sharing options for social platforms.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: `date-fns-jalali` & `Intl.DateTimeFormat`
- **Font**: Vazirmatn (via `next/font/google`)

## 📂 Project Structure

```bash
src/
├── app/
│   ├── globals.css      # Global styles & Tailwind theme
│   ├── layout.tsx       # Root layout with Font & Metadata
│   └── page.tsx         # Main landing page
├── components/
│   ├── CountdownTimer.tsx # The animated countdown component
│   ├── Footer.tsx       # Site footer
│   ├── Header.tsx       # (Optional) Navigation header
│   ├── Hero.tsx         # Hero section with standard time display
│   ├── InfoSection.tsx  # History and traditions content
│   ├── ShareButtons.tsx # Social sharing functionality
│   └── ThemeToggle.tsx  # Dark/Light mode switcher
├── hooks/
│   └── useCountdown.ts  # Logic for calculating time remaining
└── utils/
    ├── cn.ts            # Tailwind class merger
    └── date.ts          # Date formatting helpers
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

-   **Target Date**: Update `NOWRUZ_DATE` in `src/hooks/useCountdown.ts` and `src/components/Hero.tsx` for future years.
-   **Content**: Edit `src/components/InfoSection.tsx` to change the text.
-   **Theme**: Modify `src/app/globals.css` to adjust colors and fonts.
