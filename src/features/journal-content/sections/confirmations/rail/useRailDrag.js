// Drag horizontal du rail (pointer events) – isole la logique
import { reactive, ref } from 'vue';

export function useRailDrag(railRef) {
  const isDragging = ref(false);
  const drag = reactive({ downX: 0, startLeft: 0 });

  function onRailDown(e) {
    isDragging.value = true;
    railRef.value?.setPointerCapture?.(e.pointerId);
    drag.downX = e.clientX;
    drag.startLeft = railRef.value?.scrollLeft || 0;
  }
  function onRailMove(e) {
    if (!isDragging.value) return;
    const dx = e.clientX - drag.downX;
    if (railRef.value) railRef.value.scrollLeft = drag.startLeft - dx;
  }
  function onRailUp(e) {
    isDragging.value = false;
    railRef.value?.releasePointerCapture?.(e.pointerId);
  }

  return { isDragging, onRailDown, onRailMove, onRailUp };
}
