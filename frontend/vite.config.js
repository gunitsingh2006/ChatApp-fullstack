import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import daisyui from "daisyui" // it is not working with vite, so we will use the cdn version of tailwind i.e css 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss(), ]
})
