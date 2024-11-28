import type {Config} from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  plugins: [typography],
} satisfies Config
