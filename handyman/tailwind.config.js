/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      margin: {
        '-45%': '-45%',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'registration-hero-img':"url('/RegistrationFormImg/BackgroundImg.webp')",
          'registration-hero-img-sm':"url('/RegistrationFormImg/BackgroundImg-sm.webp')"
      },
      colors:{
        'orange':'#FF6A18',
        mainBackground:'#F2F8FF',
        Heading:'#0E172C'
      },
    },
   
  },
  plugins: [],
}
