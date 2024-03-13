import type { Config } from 'tailwindcss';

import colors from 'tailwindcss/colors';
// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
export default <Partial<Config>>{
  // darkMode: 'class',
  content: [],
  theme: {
    extend: {
      colors: {
        ...colors,
        gold: '#b87c1c',
      },
    },
  },
  plugins: [],
};
