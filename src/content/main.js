import { createApp } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import AppRoot from './AppRoot.vue';

// Shadow DOM pour isoler notre UI
const host = document.createElement('div');
host.id = 'tv-journal-shadow-host';
document.documentElement.appendChild(host);
const shadowRoot = host.attachShadow({ mode: 'open' });

// Point de montage
const root = document.createElement('div');
shadowRoot.appendChild(root);

// Vue + Pinia
const app = createApp(AppRoot);
const pinia = createPinia();
app.use(pinia);
setActivePinia(pinia);
app.mount(root);

// ✅ IMPORTANT : charger les features après que Pinia soit active
Promise.all([
  import('@/features/journal-button'),
  import('@/features/journal-window-shell'),
]).catch(err => console.error('[Journal] feature load failed:', err));

// (optionnel) recharger l'état persistant plus tard
import('@/stores/ui').then(({ useUiStore }) => {
  const ui = useUiStore();
  ui.load?.();
});
