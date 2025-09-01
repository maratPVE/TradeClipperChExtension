// Décide si le menu s’ouvre 'down' ou 'up' selon l’espace visible
export function computeMenuDir(railRect, cellRect, menuEstH = 80) {
    if (!railRect || !cellRect) return 'down';
    const spaceBelow = railRect.bottom - cellRect.bottom;
    const spaceAbove = cellRect.top - railRect.top;
    return (spaceBelow < menuEstH && spaceAbove > menuEstH / 2) ? 'up' : 'down';
  }
  