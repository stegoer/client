export const available = (): boolean => {
  const key = `avaiable`;
  try {
    localStorage.setItem(key, key);
    localStorage.removeItem(key);
  } catch (e) {
    return false;
  }
  return true;
};

export const isAvailable = available();

export const getItem = (item: string): string | null => {
  if (isAvailable) {
    return localStorage.getItem(item);
  } else {
    console.warn(`localStorage.getItem is not available`, item);
  }
  return null;
};

export const setItem = (item: string, value: string): void => {
  if (isAvailable) {
    localStorage.setItem(item, value);
  } else {
    console.warn(`localStorage.setItem is not available`, item, value);
  }
};

export const removeItem = (item: string): void => {
  if (isAvailable) {
    localStorage.removeItem(item);
  } else {
    console.warn(`localStorage.removeItem is not available`, item);
  }
};
