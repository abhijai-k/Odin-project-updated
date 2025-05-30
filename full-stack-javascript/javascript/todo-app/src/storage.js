const STORAGE_KEY = 'todoAppData';

export function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function load() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}
