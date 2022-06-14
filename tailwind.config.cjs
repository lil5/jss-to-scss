module.exports = {
  content: ["./src/*.{html,js,ts,tsx,svelte}"],
  theme: {
    extend: {
      fontFamily: {
        cursive: "'Ayrton pight', cursive",
      },
    },
  },
  plugins: [require("daisyui")],
};
