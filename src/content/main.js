// src/content/main.js
import { createApp } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import AppRoot from './AppRoot.vue';

// Shadow DOM
const host = document.createElement('div');
host.id = 'tv-journal-shadow-host';
document.documentElement.appendChild(host);
const shadowRoot = host.attachShadow({ mode: 'open' });

// Mount point
const root = document.createElement('div');
shadowRoot.appendChild(root);

// Vue + Pinia
const app = createApp(AppRoot);
const pinia = createPinia();
app.use(pinia);
setActivePinia(pinia);
app.mount(root);

// 🔹 Importer les features séparément (pour isoler les erreurs)
import('@/features/journal-button').catch(err =>
  console.error('[Journal] journal-button failed:', err)
);
import('@/features/journal-window-shell').catch(err =>
  console.error('[Journal] journal-window-shell failed:', err)
);

// (optionnel) recharger l'état persistant plus tard
import('@/stores/ui').then(({ useUiStore }) => {
  const ui = useUiStore();
  ui.load?.();
});


// --- Bloquer les hotkeys TV quand on est dans notre UI (Shadow DOM) ---
const isFormField = (el) => {
  return el &&
    (el.tagName === 'INPUT' ||
     el.tagName === 'TEXTAREA' ||
     el.tagName === 'SELECT' ||
     el.isContentEditable === true);
};

const stopIfInsideJournal = (ev) => {
  const path = typeof ev.composedPath === 'function' ? ev.composedPath() : [];
  const inside = path.includes(host) || path.includes(shadowRoot);
  if (!inside) return;

  // Laisse passer les événements clavier sur nos champs
  if (isFormField(ev.target)) return;

  // Sinon, on bloque TradingView
  ev.stopImmediatePropagation();
};

// clavier + wheel en capture (ok)
['keydown', 'keypress', 'keyup', 'wheel'].forEach((type) => {
  document.addEventListener(type, stopIfInsideJournal, true);
});


// On intercepte en CAPTURE pour devancer TradingView
['keydown', 'keypress', 'keyup', 'wheel'].forEach((type) => {
  document.addEventListener(type, stopIfInsideJournal, true);
});
