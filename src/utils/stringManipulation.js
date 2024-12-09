export function capitalize(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
