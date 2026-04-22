import { StateStorage } from 'zustand/middleware';

// MMKV storage adapter — requires expo prebuild to run natively.
// Falls back to a no-op in environments where MMKV is unavailable.
let storage: StateStorage;

try {
  const { MMKV } = require('react-native-mmkv');
  const mmkv = new MMKV();
  storage = {
    getItem:    (key) => mmkv.getString(key) ?? null,
    setItem:    (key, value) => mmkv.set(key, value),
    removeItem: (key) => mmkv.delete(key),
  };
} catch {
  // Fallback for environments without native build (e.g. Expo Go)
  const map = new Map<string, string>();
  storage = {
    getItem:    (key) => map.get(key) ?? null,
    setItem:    (key, value) => { map.set(key, value); },
    removeItem: (key) => { map.delete(key); },
  };
}

export { storage as mmkvStorage };
