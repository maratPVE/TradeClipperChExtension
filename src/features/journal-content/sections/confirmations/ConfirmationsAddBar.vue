<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  resetKey: { type: Number, default: 0 },
});
const emit = defineEmits(['open', 'quick']); // open(name), quick(name)

const addRef   = ref(null);
const newName  = ref('');
const invalid  = ref(false);

watch(() => props.resetKey, () => {
  newName.value = '';
  invalid.value = false;
});

function onPlusClick() {
  const name = newName.value.trim();
  if (!name) {
    invalid.value = true;
    addRef.value?.focus?.();
    setTimeout(() => (invalid.value = false), 600);
    return;
  }
  emit('open', name);
}
function onQuickAdd() {
  const name = newName.value.trim();
  if (!name) {
    invalid.value = true;
    addRef.value?.focus?.();
    setTimeout(() => (invalid.value = false), 600);
    return;
  }
  emit('quick', name);
}

const toolbarRow = {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '12px',
  alignItems: 'center',
};
const inputCase = {
  display: 'grid',
  gridTemplateColumns: '1fr auto auto',
  gap: '8px',
  alignItems: 'center',
  border: '1px solid #2e3240',
  borderRadius: '6px',
  padding: '6px 8px',
  background: '#1b1f2a',
};
const inputCaseInvalid = { border: '1px solid #a33', boxShadow: '0 0 0 1px #a33 inset' };
const inputField = {
  height: '28px', border: 'none', background: 'transparent', color: '#e5e9f0',
  outline: 'none', padding: '0 8px', fontWeight: 700, borderRadius: '4px',
};
const insetBtn = {
  width: '28px', height: '28px', borderRadius: '6px',
  border: '1px solid #3a3f51', background: 'linear-gradient(180deg, #3b3f4b, #2a2e3a)',
  color: '#c9d1d9', cursor: 'pointer', lineHeight: '26px', textAlign: 'center',
};
const searchBtn = {
  width: '32px', height: '32px', borderRadius: '6px',
  border: '1px solid #3a3f51', background: 'linear-gradient(180deg, #3b3f4b, #2a2e3a)',
  color: '#c9d1d9', cursor: 'pointer', lineHeight: '30px', textAlign: 'center',
};
</script>

<template>
  <div :style="toolbarRow">
    <div :style="[inputCase, invalid ? inputCaseInvalid : null]">
      <input
        ref="addRef"
        :style="inputField"
        v-model="newName"
        placeholder="Add confirmation..."
        aria-label="Add confirmation"
        spellcheck="false"
        @keydown.enter.stop.prevent="onPlusClick"
      />
      <button :style="insetBtn" title="Add" @click="onPlusClick">+</button>
      <button :style="insetBtn" title="Quick add" @click="onQuickAdd">⚡</button>
    </div>
    <button :style="searchBtn" title="Search">🔍</button>
  </div>
</template>
