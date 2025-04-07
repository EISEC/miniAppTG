import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Позволяет принимать подключения извне
    port: 3000, // Укажите порт, который вы используете
    strictPort: true, // Гарантирует использование указанного порта
    hmr: {
      host: 'c945-46-246-88-101.ngrok-free.app', // Укажите ваш ngrok-домен
      protocol: 'wss', // Используйте WebSocket через HTTPS
    },
    middlewareMode: false, // Отключите встроенные middleware, если нужно
    fs: {
      strict: true, // Защита от доступа к файловой системе вне корня проекта
    },
  },
})
