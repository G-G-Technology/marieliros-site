import type { Config } from 'tailwindcss';

import colors from 'tailwindcss/colors';
// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
export default <Partial<Config>>{
  // darkMode: 'class',
  content: [],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
        alexBrush: ['Alex Brush'],
        cinzel: ['Cinzel'],
        abhayaLibre: ['Abhaya Libre'],
      },
      colors: {
        ...colors,
        gray: '#393837',
        beige: '#b7a292',
        cream: '#e5e0d4',
        'medium-brown': '#3d290f',
        'dark-brown': '#271b0b',
        'light-brown': '#775233',
        'dark-blue': '#171d22',
        blue: '#364f64',
        gold: '#b87c1c',
        brickred: '#a95230',
        'medium-green': '#0c3f3f',
        turquoise: '#2b6061',
        'light-turquoise': '#649e9e',
      },
    },
  },
  plugins: [],
};
