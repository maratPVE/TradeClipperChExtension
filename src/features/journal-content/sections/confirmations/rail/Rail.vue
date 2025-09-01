<template>
  <div
    ref="railRef"
    :style="[rail, isDragging ? railDragging : null]"
    @pointerdown="onRailDown"
    @pointermove="onRailMove"
    @pointerup="onRailUp"
    @pointerleave="onRailUp"
    @click="closeMenu"
  >
    <div :style="rowsWrap">
      <!-- 3 rails indépendants, compacts à gauche -->
      <div v-for="(row, r) in rows" :key="r" :style="rowStyle">
        <Pill
          v-for="pair in row"
          :key="pair.idx"
          :item="pair.item"
          :index="pair.idx"
          :open="openIndex === pair.idx"
          @toggle="toggleMenu"
          @edit="onEdit"
          @remove="onRemove"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, provide } from 'vue';
import Pill from './Pill.vue';
import { useRailDrag } from './useRailDrag';

const props = defineProps({ items: { type: Array, required: true } });
const emit  = defineEmits(['edit','remove']);

const railRef = ref(null);
provide('getRailRect', () => railRef.value?.getBoundingClientRect?.());

const { isDragging, onRailDown, onRailMove, onRailUp } = useRailDrag(railRef);

const openIndex = ref(-1);
function toggleMenu(i){ openIndex.value = openIndex.value === i ? -1 : i; }
function closeMenu(){ openIndex.value = -1; }
function onEdit(p){ emit('edit', p); closeMenu(); }
function onRemove(i){ emit('remove', i); closeMenu(); }

/* Répartition 3 lignes (0,3,6 | 1,4,7 | 2,5,8) */
const rows = computed(() => {
  const r = [[],[],[]];
  (props.items || []).forEach((it, idx) => r[idx % 3].push({ item: it, idx }));
  return r;
});

/* === Styles === */
const rail = {
  overflowX: 'auto',
  overflowY: 'visible',
  WebkitOverflowScrolling: 'touch',
  cursor: 'grab',
  paddingBottom: '4px',
};

const railDragging = { cursor: 'grabbing' };

/* ⬇️ FLEX colonne pour éviter l’étirement */
const rowsWrap = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '6px',          // espace vertical entre lignes
  width: 'max-content' // largeur = contenu
};

/* Chaque ligne compacte ses éléments à gauche */
const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '4px',         // ⬅️ était 6px
  width: 'max-content'
};

</script>
