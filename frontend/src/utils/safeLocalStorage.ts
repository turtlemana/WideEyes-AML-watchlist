const isBrowser = typeof window !== 'undefined';

export const safeLocalStorageSet = (key: string, value: string): void => {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.error("Failed to set item in localStorage:", e);
  }
};

export const safeLocalStorageGet = (key: string): string | null => {
  if (!isBrowser) return null;
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.error("Failed to get item from localStorage:", e);
    return null;
  }
};

export const safeLocalStorageRemove = (key: string): void => {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("Failed to remove item from localStorage:", e);
  }
};
