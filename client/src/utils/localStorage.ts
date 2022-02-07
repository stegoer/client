export const getItem = (item: string): string | null => {
  if (typeof localStorage !== `undefined`) {
    return localStorage.getItem(item);
  } else {
    console.warn(`localStorage is not available, key: ${item}`);
  }
  return null;
};
