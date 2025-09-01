<template>
    <div :style="wrap">
      <div :style="label">COPY TO :</div>
      <input
        :style="input"
        v-model="journal.copyTo"
        aria-label="Copy To"
        spellcheck="false"
        @keydown.enter.stop.prevent="e => e.target.blur()"
      />
    </div>
  </template>
  
  <script setup>
  import { inject } from 'vue';
  const journal = inject('journal');
  
  const wrap = {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    gap: '8px',
    border: '1px solid #2e3240',
    borderRadius: '6px',
    padding: '6px 8px',
    background: '#1b1f2a',
  };
  const label = { opacity: 0.9, fontWeight: 700, letterSpacing: '0.3px' };
  const base = {
    height: '30px',
    borderRadius: '6px',
    border: '1px solid #3a3f51',
    background: 'linear-gradient(180deg, #3b3f4b, #2a2e3a)',
    color: '#e5e9f0',
    outline: 'none',
    padding: '0 10px',
    textAlign: 'left',
    fontWeight: 700,
  };
  const input = {
    ...base,
    width: '100%',
    background: 'transparent',
    border: 'none',
    padding: 0,
    height: '24px',
    lineHeight: '24px',
    fontWeight: 800,
    boxShadow: 'none',
  };
  </script>
  