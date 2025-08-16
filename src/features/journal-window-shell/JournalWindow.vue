<template>
  <div v-show="!ui.isWindowHidden" :style="panelStyle">
    <div :style="headerStyle" @pointerdown="onHeaderPointerDown">
      <span>Journal</span>
      <div :style="headerActions">
        <button
          v-if="view.screen === 'journal'"
          :style="textBtn"
          title="Retour au menu"
          @click="view.goMenu()"
        >Menu</button>
        <button :style="iconBtn" title="Cacher" @click="ui.hideWindow()">—</button>
      </div>
    </div>

    <!-- Barre de démarrage (hors body pour éviter le padding latéral) -->
    <StartMenu v-if="view.screen === 'menu'" />

    <!-- Corps : contenu journal -->
    <div :style="bodyStyle">
      <JournalRoot v-if="view.screen === 'journal'" />
    </div>

    <!-- Poignées de redimensionnement -->
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
import { useViewStore } from '@/stores/view';
import StartMenu from '@/features/start-menu/StartMenu.vue';
import JournalRoot from '@/features/journal-content/JournalRoot.vue';
import { useUiStore } from '@/stores/ui';
import { useDragMove } from './useDragMove';
import { useResize } from './useResize';

const ui = useUiStore();
const view = useViewStore();

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
  position: 'relative', // header au-dessus des handles
  zIndex: 3,
};

const headerActions = { display: 'flex', gap: '6px' };

const iconBtn = {
  minWidth: '28px',
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

const textBtn = {
  height: '24px',
  padding: '0 8px',
  background: 'transparent',
  border: '1px solid #3a3f51',
  borderRadius: '4px',
  color: '#c9d1d9',
  fontSize: '12px',
  lineHeight: '22px',
  cursor: 'pointer',
};

const bodyStyle = {
  flex: 1,
  overflow: 'auto',
  padding: '8px'
};

const HEADER_H = 36; // px

/* --- Styles des poignées (ne recouvrent plus le header) --- */
const HANDLE = '6px';
const CORNER = '12px';

const resizeTopStyle = {
  position: 'absolute',
  top: HEADER_H + 'px',
  left: '0',
  width: '100%',
  height: HANDLE,
  cursor: 'ns-resize',
  zIndex: 1,
};
const resizeTRStyle = {
  position: 'absolute',
  top: HEADER_H + 'px',
  right: '0',
  width: CORNER,
  height: CORNER,
  cursor: 'nesw-resize',
  zIndex: 1,
};
const resizeTLStyle = {
  position: 'absolute',
  top: HEADER_H + 'px',
  left: '0',
  width: CORNER,
  height: CORNER,
  cursor: 'nwse-resize',
  zIndex: 1,
};

const resizeLeftStyle = {
  position: 'absolute',
  top: HEADER_H + 'px',
  left: '0',
  width: HANDLE,
  height: `calc(100% - ${HEADER_H}px)`,
  cursor: 'ew-resize',
  zIndex: 1,
};
const resizeRightStyle = {
  position: 'absolute',
  top: HEADER_H + 'px',
  right: '0',
  width: HANDLE,
  height: `calc(100% - ${HEADER_H}px)`,
  cursor: 'ew-resize',
  zIndex: 1,
};

const resizeBottomStyle = {
  position: 'absolute',
  bottom: '0',
  left: '0',
  width: '100%',
  height: HANDLE,
  cursor: 'ns-resize',
  zIndex: 1,
};
const resizeBLStyle = {
  position: 'absolute',
  bottom: '0',
  left: '0',
  width: CORNER,
  height: CORNER,
  cursor: 'nesw-resize',
  zIndex: 1,
};
const resizeBRStyle = {
  position: 'absolute',
  bottom: '0',
  right: '0',
  width: CORNER,
  height: CORNER,
  cursor: 'nwse-resize',
  zIndex: 1,
};
</script>
