<template>
    <div :style="title">FEELINGS</div>
    <div :style="grid">
      <button :style="btn">SAD</button>
      <button :style="btn">HAPPY</button>
      <button :style="btn">MID</button>
      <button :style="btn">GOOD</button>
    </div>
  </template>
  
  <script setup>
  const title = { textAlign: 'center', opacity: 0.9, letterSpacing: '0.4px' };
  const grid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
    gap: '12px',
  };
  const btn = {
    height: '34px',
    borderRadius: '6px',
    border: '1px solid #3a3f51',
    background: 'linear-gradient(180deg, #3b3f4b, #2a2e3a)',
    color: '#e5e9f0',
    cursor: 'pointer',
    fontWeight: 600,
  };
  </script>
  