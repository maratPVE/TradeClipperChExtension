<template>
  <!-- v-show pour cacher sans démonter -->
  <div v-show="!ui.isWindowHidden" :style="panelStyle">
    <div :style="headerStyle">
      <span>Journal</span>
      <div :style="headerActions">
        <button :style="iconBtn" title="Cacher" @click="ui.hideWindow()">—</button>
        <button :style="iconBtn" title="Fermer" @click="ui.closeWindow()">×</button>
      </div>
    </div>
    <div :style="bodyStyle"><!-- contenu plus tard --></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();

const panelStyle = computed(() => ({
  position: 'fixed',
  top: ui.pos.top + 'px',
  right: ui.pos.right + 'px',
  width: ui.size.width + 'px',
  height: ui.size.height + 'px',
  background: '#1e222d',
  border: '1px solid #2e3240',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,.4)',
  zIndex: 99999,
  display: 'flex',
  flexDirection: 'column',
  pointerEvents: 'auto',
}));

const headerStyle = {
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 10px',
  borderBottom: '1px solid #2e3240',
  fontSize: '12px',
  color: '#c9d1d9',
  userSelect: 'none',
};

const headerActions = {
  display: 'flex',
  gap: '6px',
};

const iconBtn = {
  width: '24px',
  height: '24px',
  lineHeight: '24px',
  textAlign: 'center',
  background: 'transparent',
  border: '1px solid #3a3f51',
  borderRadius: '4px',
  color: '#c9d1d9',
  cursor: 'pointer',
  padding: 0,
};

const bodyStyle = {
  flex: 1,
};
</script>
