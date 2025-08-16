<template>
    <div :style="root">
      <div :style="placeholder">Journal – contenu à venir</div>
    </div>
  </template>
  
  <script setup>
  const root = { padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' };
  const placeholder = {
    flex: 1, border: '1px dashed #3a3f51', borderRadius: '6px',
    color: '#9aa4b2', display: 'flex', alignItems: 'center', justifyContent: 'center',
  };
  </script>
  