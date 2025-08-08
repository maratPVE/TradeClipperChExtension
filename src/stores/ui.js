import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isWindowOpen: false,           // monté ou non (on ne le remettra plus à false)
    isWindowHidden: false,         // visible / caché (v-show)
    pos:  { top: 16, right: 16 },
    size: { width: 380, height: 480 },
  }),
  actions: {
    // Ouvre (monte) & affiche
    openWindow()  { this.isWindowOpen = true; this.isWindowHidden = false; this._persist(); },

    // Cache / affiche sans démonter
    hideWindow()  { if (this.isWindowOpen) { this.isWindowHidden = true;  this._persist(); } },
    showWindow()  { if (this.isWindowOpen) { this.isWindowHidden = false; this._persist(); } },
    toggleHidden(){ if (this.isWindowOpen) { this.isWindowHidden = !this.isWindowHidden; this._persist(); } },

    // Appelé par le bouton de toolbar
    toggleFromToolbar() {
      if (!this.isWindowOpen) return this.openWindow();   // 1er clic → ouvre & affiche
      return this.toggleHidden();                         // ensuite → cache/affiche
    },

    setPos(top, right){ this.pos.top = top; this.pos.right = right; this._persist(); },
    setSize(width, height){ this.size.width = width; this.size.height = height; this._persist(); },

    async load() {
      if (typeof chrome === 'undefined' || !chrome.storage?.local) return;
      const data = await new Promise((resolve) => chrome.storage.local.get(['ui'], resolve));
      if (data && data.ui) {
        const { isWindowOpen, isWindowHidden, pos, size } = data.ui;
        if (typeof isWindowOpen === 'boolean')  this.isWindowOpen  = isWindowOpen;
        if (typeof isWindowHidden === 'boolean') this.isWindowHidden = isWindowHidden;
        if (pos)  this.pos  = { ...this.pos,  ...pos  };
        if (size) this.size = { ...this.size, ...size };
      }
    },
    _persist() {
      if (typeof chrome === 'undefined' || !chrome.storage?.local) return;
      chrome.storage.local.set({
        ui: {
          isWindowOpen: this.isWindowOpen,
          isWindowHidden: this.isWindowHidden,
          pos: this.pos,
          size: this.size,
        }
      });
    }
  }
});
