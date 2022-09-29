/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                monument: ["monument", "sans-serif"],
                sequel: ["Sequel Black", "sans-serif"],
            },
        },
    },
    plugins: [],
};