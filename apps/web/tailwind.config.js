import sharedConfig from '@eunoia-os/config/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [sharedConfig],
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
    '../../packages/ui/src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
