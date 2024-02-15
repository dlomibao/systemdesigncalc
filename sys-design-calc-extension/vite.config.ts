import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import { manifest } from './manifest'
import {createRollupLicensePlugin} from "rollup-license-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    crx({manifest}),
      createRollupLicensePlugin()
  ],
  build:{
    rollupOptions:{
      output:{
        manualChunks:{
          serviceWorker: ['src/service-worker.ts'],
        }
      }
    }
  }
})
