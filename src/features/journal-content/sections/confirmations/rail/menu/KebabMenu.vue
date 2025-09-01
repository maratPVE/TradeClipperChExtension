<template>
    <div :style="[menuBase, dir === 'down' ? menuDown : menuUp]">
      <button :style="menuItem" @click="$emit('edit')">Description</button>
      <div :style="menuSep"></div>
      <button :style="[menuItem, dangerItem]" @click="$emit('remove')">Delete</button>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    dir: { type: String, default: 'down' }, // 'down' | 'up'
  });
  
  /* Menu compact, largeur auto au contenu */
  const menuBase = {
    position: 'absolute',
    left: '0',     // ancré à gauche → s'ouvre vers la droite
    right: 'auto',
    width: 'max-content',
    minWidth: 0,
    whiteSpace: 'nowrap',
    border: '1px solid #2e3240',
    borderRadius: '6px',
    background: '#1e222d',
    boxShadow: '0 6px 16px rgba(0,0,0,.35)',
    zIndex: 5,
    overflow: 'hidden',
  };
  const menuDown = { top: '20px',  bottom: 'auto' };
  const menuUp   = { bottom: '20px', top: 'auto' };
  
  const menuItem = {
    display: 'block',
    width: '100%',
    padding: '2px 6px',
    background: 'transparent',
    border: 'none',
    color: '#d7dde9',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '11px',
    lineHeight: 1.1,
  };
  const dangerItem = { color: '#ff9b9b' };
  const menuSep = { height: '1px', background: '#2e3240' };
  </script>
  