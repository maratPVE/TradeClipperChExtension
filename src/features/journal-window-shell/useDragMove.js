// Déplacement de la fenêtre en faisant glisser le header.
// - MAJ fluide de ui.pos (sans persister pendant le move)
// - Persistance une seule fois au pointerup

export function useDragMove(ui) {
    function onHeaderPointerDown(e) {
      // Éviter de démarrer un drag si on a cliqué sur un bouton du header
      if (e.target && e.target.closest('button')) return;
  
      const header = e.currentTarget;
      header.setPointerCapture?.(e.pointerId);
  
      const startX = e.clientX;
      const startY = e.clientY;
  
      const startTop = ui.pos.top;
      const startRight = ui.pos.right;
  
      const width = ui.size.width;
      const height = ui.size.height;
  
      const move = (ev) => {
        const dx = ev.clientX - startX; // déplacement souris → + vers la droite
        const dy = ev.clientY - startY; // + vers le bas
  
        // On travaille en (top, right)
        let newTop = startTop + dy;
        let newRight = startRight - dx; // si souris va à droite, 'right' diminue
  
        // Clamp pour rester à l'écran
        const maxTop = Math.max(0, window.innerHeight - height);
        const maxRight = Math.max(0, window.innerWidth - width);
  
        if (newTop < 0) newTop = 0;
        if (newTop > maxTop) newTop = maxTop;
        if (newRight < 0) newRight = 0;
        if (newRight > maxRight) newRight = maxRight;
  
        // MAJ réactive (sans persister en continu)
        ui.pos.top = Math.round(newTop);
        ui.pos.right = Math.round(newRight);
      };
  
      const up = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        header.releasePointerCapture?.(e.pointerId);
        // Persistance une fois à la fin du drag
        ui.setPos(ui.pos.top, ui.pos.right);
      };
  
      // Empêche la sélection de texte pendant le drag
      e.preventDefault();
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    }
  
    return { onHeaderPointerDown };
  }
  