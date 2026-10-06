import os from 'node:os'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const DEV_PORT = 5175

/** Prefer typical home LAN IPs so HMR matches the Network URL on the phone. */
function getLanHost(): string | undefined {
  const candidates: string[] = []
  for (const nets of Object.values(os.networkInterfaces())) {
    if (!nets) continue
    for (const net of nets) {
      if (net.family !== 'IPv4' || net.internal) continue
      candidates.push(net.address)
    }
  }
  return (
    candidates.find((ip) => ip.startsWith('192.168.')) ??
    candidates.find((ip) => ip.startsWith('10.')) ??
    candidates[0]
  )
}

const lanHost = getLanHost()
const devOrigin = lanHost ? `http://${lanHost}:${DEV_PORT}` : undefined

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: DEV_PORT,
    strictPort: true,
    host: '0.0.0.0',
    cors: true,
    ...(devOrigin ? { origin: devOrigin } : {}),
    ws: lanHost
      ? {
          host: lanHost,
          port: DEV_PORT,
        }
      : undefined,
  },
  preview: {
    port: DEV_PORT,
    strictPort: true,
    host: '0.0.0.0',
    cors: true,
    ...(devOrigin ? { origin: devOrigin } : {}),
  },
  test: {
    environment: 'node',
  },
})
