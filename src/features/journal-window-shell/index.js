import { createApp, watch } from 'vue';
import { useUiStore } from '@/stores/ui';
import JournalWindow from './JournalWindow.vue';

let app = null;
let mountEl = null;

function mountWindow() {
  if (app) return;
  const host = document.getElementById('tv-journal-shadow-host');
  const root = host?.shadowRoot;
  if (!root) return;

  mountEl = document.createElement('div');
  // Pas d'overlay, pas de pointer-events special: la fenêtre elle-même capte les clics
  root.appendChild(mountEl);

  app = createApp(JournalWindow);
  app.mount(mountEl);
}

function unmountWindow() {
  if (!app) return;
  app.unmount();
  mountEl?.remove();
  app = null;
  mountEl = null;
}

const ui = useUiStore();
watch(
  () => ui.isWindowOpen,
  (open) => { open ? mountWindow() : unmountWindow(); },
  { immediate: true }
);
