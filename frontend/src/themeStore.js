// src/themeStore.js
import { writable } from 'svelte/store';

const initialTheme = typeof window !== 'undefined' 
  ? localStorage.getItem('theme') || 'light' 
  : 'light';

export const theme = writable(initialTheme);

theme.subscribe(value => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', value);
  }
});