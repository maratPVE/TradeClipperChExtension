<template>
  <div ref="railRef" :style="rail" @click="closeMenu">
    <div :style="gridWrap">
      <Pill
        v-for="(it, idx) in props.items"
        :key="idx"
        :item="it"
        :index="idx"
        :open="openIndex === idx"
        @toggle="toggleMenu"
        @edit="onEdit"
        @remove="onRemove"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import Pill from './Pill.vue';

const props = defineProps({ items: { type: Array, required: true } });
const emit  = defineEmits(['edit','remove']);

const railRef = ref(null);
provide('getRailRect', () => railRef.value?.getBoundingClientRect?.());

const openIndex = ref(-1);
function toggleMenu(i){ openIndex.value = openIndex.value === i ? -1 : i; }
function closeMenu(){ openIndex.value = -1; }
function onEdit(p){ emit('edit', p); closeMenu(); }
function onRemove(i){ emit('remove', i); closeMenu(); }

/* === Styles === */
const rail = {
  overflowX: 'auto',
  overflowY: 'visible',
  WebkitOverflowScrolling: 'touch',
  paddingBottom: '4px',
};

/* Grille 2 colonnes pour aligner gauche/droite */
const gridWrap = {
  display: 'grid',
  gridTemplateColumns: 'max-content max-content',
  columnGap: '8px',
  rowGap: '6px',
  width: 'max-content'
};

</script>
