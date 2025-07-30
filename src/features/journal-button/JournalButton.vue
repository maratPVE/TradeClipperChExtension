<template>
    <button
      id="tv-journal-btn"
      type="button"
      aria-label="Journal"
      data-tooltip="Journal"
      @click="handleClick"
    >
      <img :src="icon" alt="Journal" />
    </button>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import icon from '@/assets/button/journal.svg';
  
  function handleClick() {
    alert('Hello from Vue Journal!');
  }
  
  onMounted(() => {
    const btn = document.getElementById('tv-journal-btn');
    if (!btn) return;
  
    // styles identiques au JS d'origine
    Object.assign(btn.style, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '44px',
      height: '44px',
      minWidth: '44px',
      minHeight: '44px',
      padding: 0
    });
  
    const img = btn.querySelector('img');
    if (img) {
      Object.assign(img.style, {
        width: '24px',
        height: '24px',
        display: 'block'
      });
    }
  });
  </script>
  
  <style scoped>
  /* pas de CSS supplémentaire : on hérite des classes TradingView */
  </style>
  