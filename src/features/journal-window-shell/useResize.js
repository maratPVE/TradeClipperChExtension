// Redimensionnement multi-bords pour une fenêtre ancrée en top / right.
// MAJ fluide de ui.size (et ui.pos.top / ui.pos.right quand nécessaire).
// Persistance une seule fois au pointerup.


export function useResize(ui) {
    
    const MARGIN = 16;
    const MIN_W = 360;
    const MIN_H = 260;
    const MAX_W_CAP = 900;
    const MAX_H_CAP = 900;
  
    const leftFrom = (right, width) => window.innerWidth - right - width;
    const bottomFrom = (top, height) => top + height;
  
    function startPointerDrag(e, handlers) {
      const target = e.currentTarget;
      target.setPointerCapture?.(e.pointerId);
  
      const start = { x: e.clientX, y: e.clientY };
      const startSize = { width: ui.size.width, height: ui.size.height };
      const startPos  = { top: ui.pos.top, right: ui.pos.right };
      const startLeft   = leftFrom(startPos.right, startSize.width);
      const startBottom = bottomFrom(startPos.top, startSize.height);
  
      const move = (ev) => {
        const dx = ev.clientX - start.x; // + va vers la droite
        const dy = ev.clientY - start.y; // + va vers le bas
        handlers.onMove({ dx, dy, startSize, startPos, startLeft, startBottom });
      };
  
      const up = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        target.releasePointerCapture?.(e.pointerId);
        // Persistance finale (taille et/ou position si modifiées)
        ui.setSize(ui.size.width, ui.size.height);
        ui.setPos(ui.pos.top, ui.pos.right);
      };
  
      evPrevent(e);
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    }
  
    const evPrevent = (e) => { e.preventDefault(); };
  
    // ----- Helpers de clamp -----
    const clampWidthFromRight = (w, right, left) => {
      // largeur possible compte tenu du left fixe et du viewport
      const viewportMax = Math.min(
        MAX_W_CAP,
        window.innerWidth - left - MARGIN
      );
      return Math.max(MIN_W, Math.min(w, viewportMax));
    };
  
    const clampHeightFromTop = (h, top) => {
      const viewportMax = Math.min(
        MAX_H_CAP,
        window.innerHeight - top - MARGIN
      );
      return Math.max(MIN_H, Math.min(h, viewportMax));
    };
  
    // ----- BORD GAUCHE (width) -----
    function onLeftPointerDown(e) {
      startPointerDrag(e, {
        onMove: ({ dx, startSize, startPos }) => {
          // tirer vers la droite (dx>0) rétrécit la largeur
          let newW = startSize.width - dx;
          newW = clampWidthFromRight(newW, startPos.right, leftFrom(startPos.right, startSize.width));
          ui.size.width = Math.round(newW);
        },
      });
    }
  
    // ----- BORD BAS (height) -----
    function onBottomPointerDown(e) {
      startPointerDrag(e, {
        onMove: ({ dy, startSize, startPos }) => {
          let newH = startSize.height + dy;
          newH = clampHeightFromTop(newH, startPos.top);
          ui.size.height = Math.round(newH);
        },
      });
    }
  
    // ----- COIN BAS-GAUCHE (width + height) -----
    function onCornerPointerDown(e) {
      startPointerDrag(e, {
        onMove: ({ dx, dy, startSize, startPos }) => {
          let newW = startSize.width - dx;
          let newH = startSize.height + dy;
          newW = clampWidthFromRight(newW, startPos.right, leftFrom(startPos.right, startSize.width));
          newH = clampHeightFromTop(newH, startPos.top);
          ui.size.width = Math.round(newW);
          ui.size.height = Math.round(newH);
        },
      });
    }
  
    // ================== NOUVEAUX CÔTÉS ==================
  
    // ----- BORD HAUT (top + height) -----
    function onTopPointerDown(e) {
      startPointerDrag(e, {
        onMove: ({ dy, startSize, startPos, startBottom }) => {
          // On veut garder le "bottom" constant : bottom = top + height
          let newTop = startPos.top + dy;
          // Limites pour que la hauteur reste entre [MIN_H, MAX_H] et à l'écran
          const minTop = Math.max(0, startBottom - MAX_H_CAP);
          const maxTop = Math.min(startBottom - MIN_H, Math.max(0, startBottom - MIN_H));
          newTop = Math.max(minTop, Math.min(newTop, maxTop));
  
          let newH = startBottom - newTop;
          newH = clampHeightFromTop(newH, newTop);
  
          ui.pos.top = Math.round(newTop);
          ui.size.height = Math.round(newH);
        },
      });
    }
  
    // ----- BORD DROIT (right + width) -----
    function onRightPointerDown(e) {
        startPointerDrag(e, {
          onMove: ({ dx, startSize, startPos, startLeft }) => {
            // → tirer la poignée VERS LA DROITE doit AUGMENTER la largeur
            let newRight = startPos.right - dx;                           // <- était + dx
            let newW = startPos.right + startSize.width - newRight;       // W + dx
      
            newW = clampWidthFromRight(newW, newRight, startLeft);
            newRight = startPos.right + (startSize.width - newW);
            newRight = Math.max(0, newRight);
      
            ui.pos.right = Math.round(newRight);
            ui.size.width = Math.round(newW);
          },
        });
      }
      
  
    // ----- COIN HAUT-DROITE (top + height, right + width) -----
    function onTopRightPointerDown(e) {
        startPointerDrag(e, {
          onMove: ({ dx, dy, startSize, startPos, startLeft, startBottom }) => {
            // top + height (inchangé)
            let newTop = startPos.top + dy;
            const minTop = Math.max(0, startBottom - MAX_H_CAP);
            const maxTop = Math.min(startBottom - MIN_H, Math.max(0, startBottom - MIN_H));
            newTop = Math.max(minTop, Math.min(newTop, maxTop));
            let newH = startBottom - newTop;
            newH = clampHeightFromTop(newH, newTop);
      
            // right + width (corrigé)
            let newRight = startPos.right - dx;                           // <- était + dx
            let newW = startPos.right + startSize.width - newRight;       // W + dx
            newW = clampWidthFromRight(newW, newRight, startLeft);
            newRight = startPos.right + (startSize.width - newW);
            newRight = Math.max(0, newRight);
      
            ui.pos.top = Math.round(newTop);
            ui.size.height = Math.round(newH);
            ui.pos.right = Math.round(newRight);
            ui.size.width = Math.round(newW);
          },
        });
      }
      
  
    // ----- COIN BAS-DROITE (height + right/width) -----
    function onBottomRightPointerDown(e) {
        startPointerDrag(e, {
          onMove: ({ dx, dy, startSize, startPos, startLeft }) => {
            // bas (inchangé)
            let newH = startSize.height + dy;
            newH = clampHeightFromTop(newH, startPos.top);
      
            // droit (corrigé)
            let newRight = startPos.right - dx;                           // <- était + dx
            let newW = startPos.right + startSize.width - newRight;       // W + dx
            newW = clampWidthFromRight(newW, newRight, startLeft);
            newRight = startPos.right + (startSize.width - newW);
            newRight = Math.max(0, newRight);
      
            ui.size.height = Math.round(newH);
            ui.pos.right = Math.round(newRight);
            ui.size.width = Math.round(newW);
          },
        });
      }
      
      function onTopLeftPointerDown(e) {
        startPointerDrag(e, {
          onMove: ({ dx, dy, startSize, startPos, startBottom }) => {
            // Gauche : on tire la poignée → width = width - dx
            let newW = startSize.width - dx;
            newW = clampWidthFromRight(
              newW,
              startPos.right,
              leftFrom(startPos.right, startSize.width)
            );
      
            // Haut : on garde bottom constant → top bouge, height suit
            let newTop = startPos.top + dy;
            const minTop = Math.max(0, startBottom - MAX_H_CAP);
            const maxTop = Math.min(startBottom - MIN_H, Math.max(0, startBottom - MIN_H));
            newTop = Math.max(minTop, Math.min(newTop, maxTop));
      
            let newH = startBottom - newTop;
            newH = clampHeightFromTop(newH, newTop);
      
            ui.size.width = Math.round(newW);
            ui.pos.top = Math.round(newTop);
            ui.size.height = Math.round(newH);
          },
        });
    }
  
    return {
      onLeftPointerDown,
      onBottomPointerDown,
      onCornerPointerDown,     
      onTopPointerDown,          
      onRightPointerDown,        
      onTopRightPointerDown,     
      onBottomRightPointerDown,  
      onTopLeftPointerDown,  
    };
  }
  