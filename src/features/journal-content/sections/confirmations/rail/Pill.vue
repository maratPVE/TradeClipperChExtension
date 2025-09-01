<template>
    <div :style="cell">
      <!-- Pill conteneur -->
      <div :style="pill">
        <span :style="pillText">{{ name }}</span>
  
        <!-- Bouton options … -->
        <button
          :style="[kebabBtn, open ? kebabVisible : kebabHidden]"
          title="More"
          @pointerdown.stop.prevent
          @click.stop="emit('toggle', index)"
        >⋯</button>
      </div>
  
      <!-- Menu compact, flip auto haut/bas ; ancré à gauche (→ s’ouvre à droite) -->
      <KebabMenu
        v-if="open"
        :dir="dir"
        @pointerdown.stop
        @click.stop
        @edit="emit('edit', { index, name, desc })"
        @remove="emit('remove', index)"
      />
    </div>
  </template>
  
  <script setup>
  import { computed, inject, nextTick, onMounted, ref, watch } from 'vue';
  import KebabMenu from './menu/KebabMenu.vue';
  import { computeMenuDir } from './useMenuFlip';
  
  const props = defineProps({
    item:  { type: [String, Object], required: true },
    index: { type: Number, required: true },
    open:  { type: Boolean, default: false },
  });
  const emit = defineEmits(['toggle', 'edit', 'remove']);
  
  const getRailRect = inject('getRailRect', null);
  
  const name = computed(() => typeof props.item === 'string' ? props.item : (props.item?.name ?? ''));
  const desc = computed(() => typeof props.item === 'string' ? ''          : (props.item?.desc ?? ''));
  
  const dir = ref('down'); // 'down' | 'up'
  const rootRef = ref(null);
  
  watch(() => props.open, async (isOpen) => {
    if (!isOpen) return;
    await nextTick();
    const railRect = getRailRect?.();
    const cellRect = rootRef.value?.getBoundingClientRect?.();
    dir.value = computeMenuDir(railRect, cellRect, /*menuEstH*/80);
  });
  
  onMounted(() => {
    if (props.open) {
      const railRect = getRailRect?.();
      const cellRect = rootRef.value?.getBoundingClientRect?.();
      dir.value = computeMenuDir(railRect, cellRect, 80);
    }
  });
  
  /* Styles locaux */
const cell = {
  position: 'relative',
  display: 'inline-block',
  minHeight: '32px',
};

const pill = {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  height: '32px',
  borderRadius: '6px',
  border: '1px solid #3a3f51',
  background: 'linear-gradient(180deg, #3b3f4b, #2a2e3a)',
  color: '#e5e9f0',
  fontWeight: 600,
  padding: '0 16px 0 8px', // ⬅️ moins d’espace à droite pour le ⋯
  cursor: 'default',
};



  const pillText = { pointerEvents: 'none' };
  
  const kebabBtn = {
    position: 'absolute',
    top: '2px',
    right: '2px',
    width: '14px',
    height: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    lineHeight: 1,
    padding: 0,
    background: 'transparent',
    border: 'none',
    color: '#c9d1d9',
    cursor: 'pointer',
    zIndex: 3,
  };
  const kebabHidden = { opacity: 0, pointerEvents: 'none', transition: 'opacity .12s' };
  const kebabVisible = { opacity: 1, pointerEvents: 'auto', transition: 'opacity .12s' };
  </script>
  
  <!-- Root ref pour mesurer la cellule -->
  <script>
  export default { mounted() { this.$el && (this.$.setupState.rootRef = this.$el); } }
  </script>
  