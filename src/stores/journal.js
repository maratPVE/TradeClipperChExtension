import { defineStore } from 'pinia';

export const useJournalStore = defineStore('journal', {
  state: () => ({
    mode: 'live', // 'live' | 'backtest'
  }),
  actions: {
    setMode(m) { this.mode = m; }
  }
});
