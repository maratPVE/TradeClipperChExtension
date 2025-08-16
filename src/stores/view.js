import { defineStore } from 'pinia';

export const useViewStore = defineStore('view', {
  state: () => ({
    screen: 'menu', // 'menu' | 'journal'
  }),
  actions: {
    goMenu()    { this.screen = 'menu'; },
    goJournal() { this.screen = 'journal'; },
  },
});
