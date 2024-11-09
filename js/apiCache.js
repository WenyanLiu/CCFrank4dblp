/**
 * MIT License
 *
 * Copyright (c) 2019-2023 mra42 (https://github.com/mra42), dozed (https://github.com/dozed)
 */

// cached values become stale after (86400000 = 24h) millisecs
const expiresAfter = 86400000;

const keyPrefix = "CCFrank4dblp_";

// clear all our items from the cache
function clearItems() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith(keyPrefix)) {
      localStorage.removeItem(key);
    }
  }
}

function isQuotaExceededError(err) {
  return (
    err instanceof DOMException && // everything except Firefox
    (err.name === "QuotaExceededError" ||
      // Firefox
      err.name === "NS_ERROR_DOM_QUOTA_REACHED")
  );
}

const apiCache = {};

// save a key-value pair to cache
apiCache.setItem = function (key, value) {
  const prefixedKey = keyPrefix + key;
  const now = new Date();
  const item = { value: value, expires: now.getTime() + expiresAfter };

  try {
    localStorage.setItem(prefixedKey, JSON.stringify(item));
  } catch (err) {
    if (isQuotaExceededError(err)) {
      clearItems();
    }
  }
};

// get cached value of key
apiCache.getItem = function (key) {
  const prefixedKey = keyPrefix + key;

  const itemStr = localStorage.getItem(prefixedKey);
  if (itemStr == null) return null;

  const now = new Date();
  const item = JSON.parse(itemStr);

  if (item == null || now.getTime() > item.expires) {
    localStorage.removeItem(prefixedKey);
    return null;
  }
  return item.value;
};

// remove cached value for key
apiCache.removeItem = function (key) {
  const prefixedKey = keyPrefix + key;

  localStorage.removeItem(prefixedKey);
};
