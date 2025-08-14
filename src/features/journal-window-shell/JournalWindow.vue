<template>
  <div v-show="!ui.isWindowHidden" :style="panelStyle">
    <div :style="headerStyle" @pointerdown="onHeaderPointerDown">
      <span>Journal</span>
      <div :style="headerActions">
        <button :style="iconBtn" title="Cacher" @click="ui.hideWindow()">—</button>
      </div>
    </div>

    <!-- MENU (désactivé via flag) -->
    <ModeSwitcher v-if="ENABLE_MODE_MENU" />


    <!-- CONTENU (vide pour l’instant) -->
    <div :style="bodyStyle"></div>

    <!-- Poignées de redimensionnement (inchangé) -->
    <div :style="resizeLeftStyle"    @pointerdown="onLeftPointerDown"></div>
    <div :style="resizeRightStyle"   @pointerdown="onRightPointerDown"></div>
    <div :style="resizeTopStyle"     @pointerdown="onTopPointerDown"></div>
    <div :style="resizeBottomStyle"  @pointerdown="onBottomPointerDown"></div>
    <div :style="resizeBLStyle"      @pointerdown="onCornerPointerDown"></div>
    <div :style="resizeBRStyle"      @pointerdown="onBottomRightPointerDown"></div>
    <div :style="resizeTRStyle"      @pointerdown="onTopRightPointerDown"></div>
    <div :style="resizeTLStyle"      @pointerdown="onTopLeftPointerDown"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ENABLE_MODE_MENU } from '@/config/flags';
import { useUiStore } from '@/stores/ui';
import { useDragMove } from './useDragMove';
import { useResize } from './useResize';
import ModeSwitcher from '@/features/journal-content/menu/ModeSwitcher.vue';

const ui = useUiStore();
const { onHeaderPointerDown } = useDragMove(ui);
const {
  onLeftPointerDown,
  onBottomPointerDown,
  onCornerPointerDown,
  onTopPointerDown,
  onRightPointerDown,
  onTopRightPointerDown,
  onBottomRightPointerDown,
  onTopLeftPointerDown,
} = useResize(ui);

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
  overflow: 'hidden',
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
  cursor: 'grab',
};

const headerActions = { display: 'flex', gap: '6px' };
const iconBtn = {
  width: '24px', height: '24px', lineHeight: '24px', textAlign: 'center',
  background: 'transparent', border: '1px solid #3a3f51', borderRadius: '4px',
  color: '#c9d1d9', cursor: 'pointer', padding: 0,
};

const bodyStyle = {
  flex: 1,
  overflow: 'auto',
  padding: '8px' // laisse de la marge pour plus tard
};

/* handles inchangés… */
const HANDLE = '6px';
const CORNER = '12px';
const resizeLeftStyle   = { position: 'absolute', top: '0',  left: '0',  width: HANDLE, height: '100%', cursor: 'ew-resize' };
const resizeRightStyle  = { position: 'absolute', top: '0',  right: '0', width: HANDLE, height: '100%', cursor: 'ew-resize' };
const resizeTopStyle    = { position: 'absolute', top: '0',  left: '0',  width: '100%', height: HANDLE, cursor: 'ns-resize' };
const resizeBottomStyle = { position: 'absolute', bottom: '0', left: '0', width: '100%', height: HANDLE, cursor: 'ns-resize' };
const resizeBLStyle     = { position: 'absolute', bottom: '0', left: '0',  width: CORNER, height: CORNER, cursor: 'nesw-resize' };
const resizeBRStyle     = { position: 'absolute', bottom: '0', right: '0', width: CORNER, height: CORNER, cursor: 'nwse-resize' };
const resizeTRStyle     = { position: 'absolute', top: '0',  right: '0', width: CORNER, height: CORNER, cursor: 'nesw-resize' };
const resizeTLStyle     = { position: 'absolute', top: '0',  left: '0',  width: CORNER, height: CORNER, cursor: 'nwse-resize' };
</script>
