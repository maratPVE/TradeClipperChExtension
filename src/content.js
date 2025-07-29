// == TradingView – Journal Toggle =========================================
(() => {
  const TOOLBAR_SEL = '[data-name="right-toolbar"]';
  const ICON_URL    = chrome.runtime.getURL('icons/icon-128.png');

  function addJournalButton(toolbar) {
    if (toolbar.querySelector('#tv-journal-btn')) return;

    const sampleBtn = toolbar.querySelector('button');
    const baseCls   = sampleBtn ? sampleBtn.className : '';
    const btn       = document.createElement('button');

    btn.id              = 'tv-journal-btn';
    btn.type            = 'button';
    btn.ariaLabel       = 'Journal';
    btn.dataset.tooltip = 'Journal';
    btn.className       = baseCls.replace(/isActive-[^\s]+/, '');

    // ---------- style pour centrer l'icône --------------------------------
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.width = '44px';
    btn.style.height = '44px';
    btn.style.minWidth = '44px';
    btn.style.minHeight = '44px';
    btn.style.padding = '0';

    // ---------- icône simple ----------------------------------------------
    const icon = document.createElement('img');
    icon.src = ICON_URL;
    icon.alt = 'Journal';
    icon.style.width = '24px';
    icon.style.height = '24px';
    icon.style.display = 'block';
    btn.appendChild(icon);

    // ---------- action ---------------------------------------------------
    btn.addEventListener('click', () => alert('Hello!'));

    // ---------- placement sous le bouton Chats ---------------------------
    // Chercher le bouton Chats de TradingView
    const chatButton = toolbar.querySelector('button[aria-label*="Chat"], button[aria-label*="chat"], button[data-name="chat"], button[data-name="chats"]');
    
    if (chatButton) {
      // Insérer après le bouton Chats
      chatButton.parentNode.insertBefore(btn, chatButton.nextSibling);
      console.log('[Journal] Bouton placé sous le bouton Chats');
    } else {
      // Fallback : placer au début si le bouton Chats n'est pas trouvé
      toolbar.insertBefore(btn, toolbar.firstChild);
      console.log('[Journal] Bouton Chats non trouvé, placement au début');
    }
  }

  const obs = new MutationObserver(() => {
    const tb = document.querySelector(TOOLBAR_SEL);
    if (tb) addJournalButton(tb);
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
