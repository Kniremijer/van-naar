import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  site: 'https://van-naar.nl',        // pas aan als je je domein koppelt
  integrations: [preact()],

  /** ⬇️  Polyfill voor convert-units (lodash)  */
  vite: {
    define: {
      global: 'globalThis',           // <-- dit voorkomt “global is not defined”
    },
  },
});
