/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './assets/js/**/*.js',
    './assets/css/**/*.css',
    './components/**/*.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#7C3AED',
          light: '#9F67FF',
          dark: '#5B21B6',
          muted: 'rgba(124, 58, 237, 0.12)',
        },
        surface: {
          DEFAULT: '#0A0A0A',
          elevated: '#0F0F0F',
          card: '#141414',
          border: 'rgba(255, 255, 255, 0.06)',
        },
        muted: {
          DEFAULT: '#8A8A8A',
          dark: '#5C5C5C',
        },
      },
      fontFamily: {
        display: ['"Archivo Black"', 'system-ui', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'gradient-shift': 'gradient-shift 14s ease infinite',
        float: 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'fade-in': 'fade-in 0.8s ease forwards',
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 45s linear infinite',
        'orb-drift': 'orb-drift 20s ease-in-out infinite alternate',
        'line-draw': 'line-draw 2s ease forwards',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.7' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(20px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'orb-drift': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(4%, -6%) scale(1.08)' },
        },
        'line-draw': {
          from: { strokeDashoffset: '1000' },
          to: { strokeDashoffset: '0' },
        },
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(124, 58, 237, 0.22), transparent 65%)',
        'grid-pattern':
          'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        'grid-fine':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        noise:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        grid: '72px 72px',
        'grid-fine': '24px 24px',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
  /* Custom grid utilities in dsynz-elite.css use lg:col-* class names — must not purge */
  safelist: [
    'grid-12',
    'col-12',
    'col-6',
    'col-4',
    'col-5',
    'col-7',
    'col-8',
    'md:col-3',
    'md:col-6',
    'lg:col-3',
    'lg:col-4',
    'lg:col-5',
    'lg:col-6',
    'lg:col-7',
    'lg:col-8',
    'lg:col-start-6',
    'lg:col-start-7',
    'lg:col-start-8',
    'xl:col-5',
    'xl:col-7',
    'xl:col-start-8',
  ],
};
