module.exports = {
    content: ['./components/**/*.{js,jsx}', './pages/**/*.{js,jsx}'],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms"),
        require("tailwind-scrollbar")
    ],
}