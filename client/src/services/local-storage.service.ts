import { localStorageKeyPrefix } from "@constants/base/storage.constants";

const LocalStorageService = {
  get(key: string): string | undefined {
    if (typeof localStorage !== `undefined`) {
      return (
        localStorage.getItem(`${localStorageKeyPrefix}${key}`) || undefined
      );
    }
  },
  set(key: string, value: string) {
    if (typeof localStorage !== `undefined`) {
      localStorage.setItem(`${localStorageKeyPrefix}${key}`, value);
    }
  },
  remove(key: string) {
    if (typeof localStorage !== `undefined`) {
      localStorage.removeItem(`${localStorageKeyPrefix}${key}`);
    }
  },
  clear() {
    if (typeof localStorage !== `undefined`) {
      localStorage.clear();
    }
  },
};

export default LocalStorageService;
