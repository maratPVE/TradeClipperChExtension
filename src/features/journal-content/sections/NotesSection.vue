<template>
    <div :style="title">NOTES</div>
    <div :style="box">{{ journal.notes }}</div>
  </template>
  
  <script setup>
  import { inject } from 'vue';
  const journal = inject('journal');
  
  const title = { textAlign: 'center', opacity: 0.9, letterSpacing: '0.4px' };
  const box = {
    border: '1px solid #3a3f51',
    borderRadius: '6px',
    background: '#222634',
    padding: '12px',
    fontWeight: 800,
  };
  </script>
  