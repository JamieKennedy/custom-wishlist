/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                meteor: "url(src/assets/Meteor.svg)",
                hexagon: "url(src/assets/Hexagon.svg)",
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};
