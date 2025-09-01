// Redimensionnement multi-bords pour une fenêtre ancrée top/right.
import { MARGIN, MIN_W, MIN_H, MAX_W_CAP, MAX_H_CAP } from './constants';

export function useResize(ui) {
  const leftFrom  = (right, width) => window.innerWidth - right - width;
  const bottomFrom = (top, height) => top + height;

  function evPrevent(e){ e.preventDefault(); }

  function startPointerDrag(e, handlers) {
    const target = e.currentTarget;
    target.setPointerCapture?.(e.pointerId);

    const start = { x: e.clientX, y: e.clientY };
    const startSize = { width: ui.size.width, height: ui.size.height };
    const startPos  = { top: ui.pos.top, right: ui.pos.right };
    const startLeft   = leftFrom(startPos.right, startSize.width);
    const startBottom = bottomFrom(startPos.top, startSize.height);

    const move = (ev) => {
      const dx = ev.clientX - start.x; // + vers la droite
      const dy = ev.clientY - start.y; // + vers le bas
      handlers.onMove({ dx, dy, startSize, startPos, startLeft, startBottom });
    };

    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      target.releasePointerCapture?.(e.pointerId);
      // Persistance finale
      ui.setSize(ui.size.width, ui.size.height);
      ui.setPos(ui.pos.top, ui.pos.right);
    };

    evPrevent(e);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  // ----- Helpers de clamp -----
  const clampWidthFromRight = (w, right, left) => {
    const viewportMax = Math.min(MAX_W_CAP, window.innerWidth - left - MARGIN);
    return Math.max(MIN_W, Math.min(w, viewportMax));
  };
  const clampHeightFromTop = (h, top) => {
    const viewportMax = Math.min(MAX_H_CAP, window.innerHeight - top - MARGIN);
    return Math.max(MIN_H, Math.min(h, viewportMax));
  };

  // ===== BORD GAUCHE (width) — dynamique =====
  function onLeftPointerDown(e) {
    startPointerDrag(e, {
      onMove: ({ dx, startSize, startPos }) => {
        let newW = startSize.width - dx; // tirer à gauche => dx<0 => largeur augmente
        // ⬇️ left COURANT en fonction de newW (important!)
        const currentLeft = leftFrom(startPos.right, newW);
        newW = clampWidthFromRight(newW, startPos.right, currentLeft);
        ui.size.width = Math.round(newW);
      },
    });
  }

  // ===== BORD BAS (height)
  function onBottomPointerDown(e) {
    startPointerDrag(e, {
      onMove: ({ dy, startSize, startPos }) => {
        let newH = startSize.height + dy;
        newH = clampHeightFromTop(newH, startPos.top);
        ui.size.height = Math.round(newH);
      },
    });
  }

  // ===== COIN BAS-GAUCHE (width + height) — dynamique =====
  function onCornerPointerDown(e) {
    startPointerDrag(e, {
      onMove: ({ dx, dy, startSize, startPos }) => {
        let newW = startSize.width - dx;
        let newH = startSize.height + dy;
        const currentLeft = leftFrom(startPos.right, newW);
        newW = clampWidthFromRight(newW, startPos.right, currentLeft);
        newH = clampHeightFromTop(newH, startPos.top);
        ui.size.width = Math.round(newW);
        ui.size.height = Math.round(newH);
      },
    });
  }

  // ===== BORD HAUT (top + height)
  function onTopPointerDown(e) {
    startPointerDrag(e, {
      onMove: ({ dy, startSize, startPos, startBottom }) => {
        let newTop = startPos.top + dy;
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

  // ===== BORD DROIT (right + width) — déjà corrigé
  function onRightPointerDown(e) {
    startPointerDrag(e, {
      onMove: ({ dx, startSize, startPos, startLeft }) => {
        let newRight = startPos.right - dx;
        let newW = startPos.right + startSize.width - newRight;
        newW = clampWidthFromRight(newW, newRight, startLeft);
        newRight = startPos.right + (startSize.width - newW);
        newRight = Math.max(0, newRight);
        ui.pos.right = Math.round(newRight);
        ui.size.width = Math.round(newW);
      },
    });
  }

  // ===== COIN HAUT-DROITE
  function onTopRightPointerDown(e) {
    startPointerDrag(e, {
      onMove: ({ dx, dy, startSize, startPos, startLeft, startBottom }) => {
        let newTop = startPos.top + dy;
        const minTop = Math.max(0, startBottom - MAX_H_CAP);
        const maxTop = Math.min(startBottom - MIN_H, Math.max(0, startBottom - MIN_H));
        newTop = Math.max(minTop, Math.min(newTop, maxTop));
        let newH = startBottom - newTop;
        newH = clampHeightFromTop(newH, newTop);

        let newRight = startPos.right - dx;
        let newW = startPos.right + startSize.width - newRight;
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

  // ===== COIN BAS-DROITE
  function onBottomRightPointerDown(e) {
    startPointerDrag(e, {
      onMove: ({ dx, dy, startSize, startPos, startLeft }) => {
        let newH = startSize.height + dy;
        newH = clampHeightFromTop(newH, startPos.top);

        let newRight = startPos.right - dx;
        let newW = startPos.right + startSize.width - newRight;
        newW = clampWidthFromRight(newW, newRight, startLeft);
        newRight = startPos.right + (startSize.width - newW);
        newRight = Math.max(0, newRight);

        ui.size.height = Math.round(newH);
        ui.pos.right = Math.round(newRight);
        ui.size.width = Math.round(newW);
      },
    });
  }

  // ===== COIN HAUT-GAUCHE — dynamique
  function onTopLeftPointerDown(e) {
    startPointerDrag(e, {
      onMove: ({ dx, dy, startSize, startPos, startBottom }) => {
        let newW = startSize.width - dx;
        const currentLeft = leftFrom(startPos.right, newW);
        newW = clampWidthFromRight(newW, startPos.right, currentLeft);

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
