<template>
    <div :style="row">
      <button :style="btnEnd">END SESSION</button>
      <button :style="btnAdd">ADD TRADE</button>
    </div>
  </template>
  
  <script setup>
  const row = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginTop: '6px',
  };
  const btnEnd = {
    height: '48px',
    borderRadius: '10px',
    border: '1px solid #3a3f51',
    background: 'linear-gradient(180deg, #3b3f4b, #2a2e3a)',
    color: '#e5e9f0',
    fontSize: '18px',
    fontWeight: 900,
    cursor: 'pointer',
  };
  const btnAdd = {
    height: '48px',
    borderRadius: '10px',
    border: '1px solid #2e8048',
    background: 'linear-gradient(90deg, #2790ff, #26c96f)',
    color: '#071a12',
    fontSize: '18px',
    fontWeight: 900,
    cursor: 'pointer',
  };
  </script>
  