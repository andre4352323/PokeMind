import { MAX_SEARCH_LENGTH } from '../config';

const ALLOWED = 'abcdefghijklmnopqrstuvwxyz0123456789-';

function hasOnlyAllowedCharacters(text) {
  for (const character of text) {
    if (!ALLOWED.includes(character)) {
      return false;
    }
  }
  return true;
}

export function validateSearch(input) {
  const value = input.trim().toLowerCase().split(' ').join('-');

  if (!value) {
    return { ok: false, message: 'Type a Pokemon name first.' };
  }
  if (value.length > MAX_SEARCH_LENGTH) {
    return { ok: false, message: `Name is too long (max ${MAX_SEARCH_LENGTH} characters).` };
  }
  if (!hasOnlyAllowedCharacters(value)) {
    return { ok: false, message: 'Use only letters, numbers and hyphens.' };
  }
  return { ok: true, value };
}