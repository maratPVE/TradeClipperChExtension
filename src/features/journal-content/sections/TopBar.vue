<template>
    <div :style="row">
      <div :style="pill">{{ journal.symbol }}</div>
  
      <input
        type="date"
        :style="dateInput"
        v-model="journal.dateISO"
        aria-label="Trade date"
        @keydown.enter.stop.prevent="e => e.target.blur()"
      />
  
      <div :style="actionsRight"><!-- (actions déplacées dans Confirmations) --></div>
    </div>
  </template>
  
  <script setup>
  import { inject } from 'vue';
  const journal = inject('journal');
  
  const row = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr auto',
    gap: '12px',
    alignItems: 'center',
  };
  const pill = {
    height: '34px',
    lineHeight: '34px',
    borderRadius: '6px',
    border: '1px solid #3a3f51',
    background: 'linear-gradient(180deg, #3b3f4b, #2a2e3a)',
    textAlign: 'center',
    fontWeight: 600,
  };
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
  const dateInput = {
    ...base,
    height: '34px',
    textAlign: 'center',
    padding: '0 8px',
    fontWeight: 600,
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
  };
  const actionsRight = { display: 'flex', gap: '10px', justifyContent: 'flex-end' };
  </script>
  