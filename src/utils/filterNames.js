import { PAGE_SIZE } from '../config';


export function filterNames(names, query) {
  const text = query.trim().toLowerCase().split(' ').join('-');
  if (!text) return [];

  return names.filter((name) => name.includes(text)).slice(0, PAGE_SIZE);
}