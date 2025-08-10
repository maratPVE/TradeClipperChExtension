<template>
    <div :style="wrapStyle">
      <!-- Espace gauche qui s'anime: centre uniquement à la largeur minimale -->
      <div :style="spacerStyle"></div>
  
      <!-- Groupe de boutons -->
      <div :style="groupStyle">
        <button
          :style="[tabBase, mode === 'live' ? tabActive : tabIdle]"
          aria-pressed="mode === 'live'"
          @click="set('live')"
        >
          Live trading
        </button>
  
        <button
          :style="[tabBase, mode === 'backtest' ? tabActive : tabIdle]"
          aria-pressed="mode === 'backtest'"
          @click="set('backtest')"
        >
          Back testing
        </button>
      </div>
  
      <!-- On laisse le reste de la ligne flexible à droite -->
      <div style="flex:1 1 auto;"></div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useUiStore } from '@/stores/ui';
  import { useJournalStore } from '@/stores/journal';
  import { MIN_W } from '@/features/journal-window-shell/constants';
  
  // mêmes constantes que dans le design actuel
  const PADDING_X = 24;         // padding horizontal du wrap (12px gauche + 12px droite)
  const BTN_MIN_W = 140;        // minWidth d'un bouton
  const GAP = 12;               // espace entre les deux boutons
  const GROUP_W = BTN_MIN_W * 2 + GAP; // largeur minimale du groupe = 292px
  
  const ui = useUiStore();
  const journal = useJournalStore();
  
  const mode = computed(() => journal.mode);
  function set(m) { journal.setMode(m); }
  
  // Ligne du menu : on reste en flex-start (accroché gauche)
  // On ne joue plus avec justify-content pour éviter tout "saut"
  const wrapStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px 8px',
    borderBottom: '1px solid #2e3240',
    minHeight: '48px'
  };
  
  // Groupe des deux boutons
  const groupStyle = {
    display: 'flex',
    gap: `${GAP}px`
  };
  
  // Espace gauche animé : quand on est à la largeur minimale,
  // on lui donne exactement l'espace pour centrer le groupe ; sinon 0.
  const spacerStyle = computed(() => {
    // espace horizontal disponible à l'intérieur du wrap
    const innerWidth = Math.max(0, ui.size.width - PADDING_X);
  
    // quantité d'espace pour centrer (si width == MIN_W)
    const neededToCenter = Math.max(0, (innerWidth - GROUP_W) / 2);
  
    // on centre uniquement à la largeur minimale, sinon attaché gauche
    const widthPx = ui.size.width <= MIN_W ? neededToCenter : 0;
  
    return {
      flex: '0 0 auto',
      width: `${Math.round(widthPx)}px`,
      transition: 'width 120ms ease'  // rend la transition "douce"
    };
  });
  
  // Styles de boutons (inchangés, juste un peu plus grands)
  const tabBase = {
    height: '34px',
    padding: '0 16px',
    fontSize: '12.5px',
    lineHeight: '34px',
    color: '#c9d1d9',
    borderRadius: '6px',
    border: '1px solid #3a3f51',
    background: 'transparent',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    minWidth: `${BTN_MIN_W}px`
  };
  
  const tabIdle = { opacity: 0.9 };
  const tabActive = {
    background: '#2a2e3a',
    borderColor: '#4a5166',
    opacity: 1,
  };
  </script>
  