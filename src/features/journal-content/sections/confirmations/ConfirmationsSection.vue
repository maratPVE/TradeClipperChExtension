<template>
    <div :style="title">CONFIRMATIONS</div>
  
    <ConfirmationsAddBar
      :reset-key="resetKey"
      @open="openModalForAdd"
      @quick="quickAdd"
    />
  
    <ConfirmationsRail
      :items="journal.confirmations"
      @edit="openModalForEdit"
      @remove="removeItem"
    />
  
    <ConfirmationsModal
      v-if="showModal"
      :key="modalKey"
      :title="'CONFIRMATION'"
      :name="modalName"
      :initial-desc="modalDesc"
      :action-label="'Save'"
      @cancel="closeModal"
      @confirm="saveModal"
    />
  </template>
  
  <script setup>
  import { inject, ref } from 'vue';
  import ConfirmationsAddBar from './ConfirmationsAddBar.vue';
  import ConfirmationsModal  from './ConfirmationsModal.vue';
  import ConfirmationsRail   from './ConfirmationsRail.vue';
  
  /** Journal est fourni par JournalRoot via provide('journal', state) */
  const journal = inject('journal');
  
  /** État UI du module Confirmations */
  const showModal  = ref(false);
  const modalName  = ref('');   // nom courant (ajout/édition)
  const modalDesc  = ref('');   // description courante (édition)
  const modalIndex = ref(-1);   // -1 = ajout ; >=0 = édition à l'index
  const modalKey   = ref(0);    // force reset du composant modal
  const resetKey   = ref(0);    // force reset de l'input de l'AddBar
  
  /** Helpers pour compat string/obj */
  function ensureObj(item) {
    if (typeof item === 'string') return { name: item, desc: '' };
    return { name: item?.name || '', desc: item?.desc || '' };
  }
  function setItem(idx, obj) {
    const o = ensureObj(obj);
    journal.confirmations[idx] = { name: o.name, desc: o.desc };
  }
  
  /** Ouvre la modale en mode "ajout" (depuis +) */
  function openModalForAdd(name) {
    modalIndex.value = -1;
    modalName.value  = (name || '').trim();
    modalDesc.value  = '';
    modalKey.value++;
    showModal.value  = true;
  }
  
  /** Ouvre la modale en mode "édition" (depuis ⋯ → Description) */
  function openModalForEdit({ index, name, desc }) {
    modalIndex.value = index;
    modalName.value  = name || '';
    modalDesc.value  = desc || '';
    modalKey.value++;
    showModal.value  = true;
  }
  
  function closeModal() {
    showModal.value = false;
  }
  
  /** Sauvegarde depuis la modale (ajout/édition) */
  function saveModal(payload) {
    const n = (payload?.name || '').trim();
    const d = payload?.desc || '';
    if (!n) return;
  
    if (modalIndex.value >= 0) {
      // édition
      setItem(modalIndex.value, { name: n, desc: d });
    } else {
      // ajout
      journal.confirmations.push({ name: n, desc: d });
    }
  
    showModal.value = false;
    modalName.value = '';
    modalDesc.value = '';
    resetKey.value++; // vide le champ de l'AddBar
  }
  
  /** Ajout rapide (⚡), sans description */
  function quickAdd(name) {
    const n = (name || '').trim();
    if (!n) return;
    journal.confirmations.push({ name: n, desc: '' });
    resetKey.value++;
  }
  
  /** Suppression */
  function removeItem(index) {
    if (index >= 0 && index < journal.confirmations.length) {
      journal.confirmations.splice(index, 1);
    }
  }
  
  /** Style titre centré */
  const title = {
    textAlign: 'center',
    fontWeight: 700,
    letterSpacing: '0.4px',
    marginBottom: '6px',
  };
  </script>
  