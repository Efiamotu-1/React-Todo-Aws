import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: [
    {
      find: './runtimeConfig',
      replacement: './runtimeConfig.browser',
    },
  ]
},
//Add build if you are going to use a Git-based (Github or CodeCommit) deployement
build: {
  outDir: "build",
}
})
