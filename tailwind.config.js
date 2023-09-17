/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                bg: '#242229',
                bg2: '#35333d',
                bg3: '#222027',
                active: '#f587a6',
                inactive: '#e7defc',
            },

            boxShadow: {
                drop: '3px 3px 5px black',
            },
        },
    },
    plugins: [],
};
