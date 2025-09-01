<template>
    <div :style="overlay" @click.self="onCancel">
      <div :style="modalBox">
        <div :style="modalTitle">{{ title }}</div>
  
        <!-- Nom EDITABLE -->
        <input
          :style="[nameInput, invalid ? nameInputInvalid : null]"
          v-model="localName"
          placeholder="Confirmation name"
          aria-label="Confirmation name"
          spellcheck="false"
          @keydown.stop
          @keydown.enter.prevent="onConfirm"
        />
  
        <!-- Description EDITABLE -->
        <textarea
          :style="descArea"
          v-model="desc"
          placeholder="Description..."
          aria-label="Confirmation description"
          spellcheck="false"
          @keydown.stop
        ></textarea>
  
        <div :style="modalActions">
          <button :style="btnGhost" @click="onCancel">Cancel</button>
          <button
            :style="[btnPrimary, disabled ? btnDisabled : null]"
            :disabled="disabled"
            @click="onConfirm"
          >
            {{ actionLabel }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  const props = defineProps({
    // on garde le même nom de prop pour compatibilité : c'est le *nom initial*
    name:         { type: String, required: true },
    title:        { type: String, default: 'CONFIRMATION' },
    initialDesc:  { type: String, default: '' },
    actionLabel:  { type: String, default: 'Save' },
  });
  const emit = defineEmits(['cancel', 'confirm']); // confirm({ name, desc })
  
  const localName = ref(props.name || '');
  const desc      = ref(props.initialDesc || '');
  
  watch(() => props.name,        v => { localName.value = v || ''; });
  watch(() => props.initialDesc, v => { desc.value      = v || ''; });
  
  const invalid  = computed(() => !localName.value.trim());
  const disabled = invalid;
  
  function onCancel() { emit('cancel'); }
  function onConfirm() {
    if (disabled.value) return;
    emit('confirm', { name: localName.value.trim(), desc: desc.value });
  }
  
  /* Styles */
  const overlay = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,.35)',
    zIndex: 100000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const modalBox = {
    width: 'min(420px, 92vw)',
    border: '1px solid #2e3240',
    borderRadius: '10px',
    background: '#1e222d',
    boxShadow: '0 12px 30px rgba(0,0,0,.6)',
    padding: '14px',
    display: 'grid',
    gap: '12px',
  };
  const modalTitle = {
    textAlign: 'center',
    fontWeight: 800,
    letterSpacing: '0.5px',
    color: '#d7dde9',
  };
  const nameInput = {
    height: '32px',
    border: '1px solid #3a3f51',
    borderRadius: '8px',
    background: '#1b1f2a',
    color: '#e5e9f0',
    outline: 'none',
    padding: '0 10px',
    fontWeight: 800,
  };
  const nameInputInvalid = { border: '1px solid #a33', boxShadow: '0 0 0 1px #a33 inset' };
  const descArea = {
    minHeight: '110px',
    resize: 'vertical',
    border: '1px solid #3a3f51',
    borderRadius: '8px',
    background: '#222634',
    color: '#e5e9f0',
    outline: 'none',
    padding: '8px 10px',
    fontSize: '12px',
    lineHeight: 1.4,
  };
  const modalActions = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginTop: '4px',
  };
  const btnGhost = {
    height: '36px',
    borderRadius: '8px',
    border: '1px solid #3a3f51',
    background: 'transparent',
    color: '#c9d1d9',
    fontWeight: 800,
    cursor: 'pointer',
  };
  const btnPrimary = {
    height: '36px',
    borderRadius: '8px',
    border: '1px solid #2e8048',
    background: 'linear-gradient(90deg, #2790ff, #26c96f)',
    color: '#071a12',
    fontWeight: 900,
    cursor: 'pointer',
  };
  const btnDisabled = { opacity: 0.6, cursor: 'not-allowed' };
  </script>
  