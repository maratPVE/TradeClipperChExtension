import { createApp } from 'vue';
import JournalButton from './JournalButton.vue';

const TOOLBAR_SEL = '[data-name="right-toolbar"]';
let mounted = false;

function injectButton(toolbar) {
  if (mounted) return;
  if (toolbar.querySelector('#tv-journal-btn')) return;

  // conteneur du composant Vue
  const container = document.createElement('div');

  // copie la classe du premier bouton TV pour hériter du style
  const sampleBtn = toolbar.querySelector('button');
  if (sampleBtn) {
    container.className = sampleBtn.className.replace(/isActive-[^\s]+/, '');
  }

  // place le conteneur en tête de barre (ou ailleurs selon tes besoins)
  toolbar.insertBefore(container, toolbar.firstChild);

  // monte le composant Vue dans ce conteneur
  createApp(JournalButton).mount(container);
  mounted = true;
  console.log('[Journal] bouton injecté');
}

// observe le DOM jusqu'à ce que la toolbar soit disponible
const observer = new MutationObserver(() => {
  const tb = document.querySelector(TOOLBAR_SEL);
  if (tb) injectButton(tb);
});
observer.observe(document.documentElement, { childList: true, subtree: true });
