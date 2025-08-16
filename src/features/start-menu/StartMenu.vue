<template>
    <div :style="wrap">
      <!-- spacer animé: centre uniquement à la largeur minimale -->
      <div :style="spacer"></div>
  
      <button :style="btn" @click="goJournal">Start</button>
  
      <div style="flex:1 1 auto;"></div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useUiStore } from '@/stores/ui';
  import { useViewStore } from '@/stores/view';
  import { MIN_W } from '@/features/journal-window-shell/constants.js'; // <-- note .js
  
  const ui = useUiStore();
  const view = useViewStore();
  
  function goJournal() { view.goJournal(); }
  
  const wrap = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px 8px',
    borderBottom: '1px solid #2e3240',
    minHeight: '48px',
  };
  
  const BTN_MIN_W = 160;
  const PADDING_X = 24;
  
  const spacer = computed(() => {
    const inner = Math.max(0, ui.size.width - PADDING_X);
    const needCenter = Math.max(0, (inner - BTN_MIN_W) / 2);
    const w = ui.size.width <= MIN_W ? needCenter : 0;
    return { flex: '0 0 auto', width: `${Math.round(w)}px`, transition: 'width 120ms ease' };
  });
  
  const btn = {
    height: '34px',
    padding: '0 20px',
    minWidth: `${BTN_MIN_W}px`,
    lineHeight: '34px',
    fontSize: '12.5px',
    color: '#c9d1d9',
    background: '#2a2e3a',
    border: '1px solid #4a5166',
    borderRadius: '6px',
    cursor: 'pointer',
  };
  </script>
  