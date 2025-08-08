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
import { useUiStore } from '@/stores/ui';
import icon from '@/assets/button/journal.svg';

const ui = useUiStore();

function handleClick() {
  ui.toggleFromToolbar();   // ✅ bouton = ouvrir/montrer ↔ fermer
}

onMounted(() => {
  const btn = document.getElementById('tv-journal-btn');
  if (!btn) return;

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
  if (img) Object.assign(img.style, { width: '24px', height: '24px', display: 'block' });
});
</script>

<style scoped>
img { width: 24px; height: 24px; display: block; }
</style>
