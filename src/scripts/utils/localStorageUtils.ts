type LocalStorageItem = {
  popupsArentBlocked: boolean;
  darkTheme: boolean;
};

type ValueOfLocalStorage = LocalStorageItem[keyof LocalStorageItem];

export const localStorageUtils = {
  getItem: (itemKey: keyof LocalStorageItem): ValueOfLocalStorage | null => {
    const maybeItemValue = localStorage.getItem(itemKey);
    return maybeItemValue ? JSON.parse(maybeItemValue) : null;
  },
  setItem: (
    itemKey: keyof LocalStorageItem,
    itemValue: ValueOfLocalStorage,
  ) => {
    localStorage.setItem(itemKey, JSON.stringify(itemValue));
  },
};
