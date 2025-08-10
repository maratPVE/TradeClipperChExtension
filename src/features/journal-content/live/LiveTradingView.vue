<template>
    <div :style="styleRoot">
      <p :style="title">Live trading</p>
      <div :style="placeholder">Contenu live (à venir)</div>
    </div>
  </template>
  
  <script setup>
  const styleRoot = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '8px'
  };
  const title = { margin: 0, fontSize: '12px', color: '#9aa4b2', letterSpacing: '.2px' };
  const placeholder = {
    flex: 1,
    minHeight: '120px',
    border: '1px dashed #3a3f51',
    borderRadius: '6px',
    color: '#9aa4b2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
  </script>
  