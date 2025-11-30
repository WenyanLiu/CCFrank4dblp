/**
 * Options page script for CCFrank4dblp
 * Allows users to configure the dblp domain
 */

// Initialize i18n and load settings when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Replace all i18n placeholders first
  replaceI18nPlaceholders();
  
  // Load saved settings
  loadSettings();
  
  // Handle form submission
  document.getElementById('optionsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    saveSettings();
  });
});

/**
 * Replace all __MSG_*__ placeholders in the HTML
 */
function replaceI18nPlaceholders() {
  // Replace in text nodes (including head and body)
  const walker = document.createTreeWalker(
    document.documentElement,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  
  const textNodes = [];
  let node;
  while (node = walker.nextNode()) {
    if (node.textContent && node.textContent.includes('__MSG_')) {
      textNodes.push(node);
    }
  }
  
  textNodes.forEach(function(textNode) {
    const text = textNode.textContent;
    const newText = text.replace(/__MSG_(\w+)__/g, function(match, key) {
      return chrome.i18n.getMessage(key) || match;
    });
    if (newText !== text) {
      textNode.textContent = newText;
    }
  });
  
  // Replace in attributes (including head and body)
  const allElements = document.querySelectorAll('*');
  allElements.forEach(function(el) {
    Array.from(el.attributes).forEach(function(attr) {
      if (attr.value && attr.value.includes('__MSG_')) {
        const newValue = attr.value.replace(/__MSG_(\w+)__/g, function(match, key) {
          return chrome.i18n.getMessage(key) || match;
        });
        if (newValue !== attr.value) {
          el.setAttribute(attr.name, newValue);
        }
      }
    });
  });
  
  // Set HTML lang attribute based on browser language
  const uiLocale = chrome.i18n.getUILanguage();
  if (uiLocale) {
    document.documentElement.lang = uiLocale;
    // Also set dir attribute for RTL languages if needed
    if (['ar', 'he', 'fa', 'ur'].includes(uiLocale.split('-')[0])) {
      document.documentElement.dir = 'rtl';
    }
  }
}

function loadSettings() {
  chrome.storage.sync.get(['dblpDomain'], function(result) {
    const domain = result.dblpDomain || 'dblp.org';
    document.getElementById('dblpDomain').value = domain;
  });
}

function saveSettings() {
  const domain = document.getElementById('dblpDomain').value.trim();
  
  // Validate domain
  if (!domain) {
    showStatus('__MSG_domainRequired__', 'error');
    return;
  }
  
  // Basic domain validation (remove protocol if present)
  let cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  
  // Save to storage
  chrome.storage.sync.set({ dblpDomain: cleanDomain }, function() {
    showStatus('__MSG_settingsSaved__', 'success');
    
    // Update the input field with cleaned domain
    document.getElementById('dblpDomain').value = cleanDomain;
  });
}

function showStatus(messageKey, type) {
  const statusDiv = document.getElementById('status');
  // Extract message key from __MSG_key__ format or use directly
  let key = messageKey;
  if (messageKey.startsWith('__MSG_') && messageKey.endsWith('__')) {
    key = messageKey.replace('__MSG_', '').replace('__', '');
  }
  statusDiv.textContent = chrome.i18n.getMessage(key) || messageKey;
  statusDiv.className = 'status ' + type;
  statusDiv.style.display = 'block';
  
  setTimeout(function() {
    statusDiv.style.display = 'none';
  }, 3000);
}


