import { defineConfig } from 'vite';
import reactJsx from 'vite-react-jsx';
import reactRefresh from '@vitejs/plugin-react-refresh';
import loadVersion from 'vite-plugin-package-version';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactJsx(), reactRefresh(), loadVersion()],
});
