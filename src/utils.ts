export function toMonthString(date: string) {
  /* 
    date: YYYY-MM-DD
    result: MM/YYYY
  */
  const parts = date.split('-');
  if (parts.length !== 3) {
    return '';
  }

  return `${parts[1]}/${parts[0]}`;
}

export function generateId() {
  return 'id' + Math.random().toString(16).slice(2);
}
