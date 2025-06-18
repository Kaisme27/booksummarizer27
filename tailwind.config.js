    // tailwind.config.js
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./src/**/*.{js,ts,jsx,tsx}", // 确保是这一行，或者类似的路径，能识别js, ts, jsx, tsx文件
      ],
      theme: {
        extend: {
          fontFamily: {
            sans: [
              '-apple-system',
              'BlinkMacSystemFont',
              'Segoe UI',
              'Roboto',
              'Oxygen',
              'Ubuntu',
              'Cantarell',
              'Fira Sans',
              'Droid Sans',
              'Helvetica Neue',
              'sans-serif',
            ],
          },
        },
      },
      plugins: [],
    }