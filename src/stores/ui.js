import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isWindowOpen: false,           // montée/démontée
    isWindowHidden: false,         // montée mais invisible
    pos:  { top: 16, right: 16 },
    size: { width: 380, height: 480 },
  }),
  actions: {
    // Ouvrir / fermer (monter/démonter)
    openWindow()  { this.isWindowOpen = true;  this.isWindowHidden = false; this._persist(); },
    closeWindow() { this.isWindowOpen = false; /* hidden peu importe */      this._persist(); },

    // Cacher / afficher (sans démonter)
    hideWindow()  { if (this.isWindowOpen) { this.isWindowHidden = true;  this._persist(); } },
    showWindow()  { if (this.isWindowOpen) { this.isWindowHidden = false; this._persist(); } },

    // Utilitaire pour le bouton de toolbar
    toggleFromToolbar() {
      if (!this.isWindowOpen)        return this.openWindow();  // pas ouverte → ouvrir
      if (this.isWindowHidden)       return this.showWindow();  // cachée   → afficher
      return this.closeWindow();                                // visible  → fermer
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
