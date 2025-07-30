import { createApp } from 'vue';
import AppRoot from './AppRoot.vue';

// 1) on fixe un Shadow DOM pour isoler notre CSS
const shadowHost = document.createElement('div');
shadowHost.id = 'tv-journal-shadow-host';
document.documentElement.appendChild(shadowHost);
const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

// 2) on crée la racine où Vue va se monter
const appRoot = document.createElement('div');
shadowRoot.appendChild(appRoot);

// 3) on démarre l'app (ne fait qu'enregistrer les features)
createApp(AppRoot).mount(appRoot);
