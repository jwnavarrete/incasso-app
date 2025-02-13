// Función para verificar si el localStorage está disponible
const isLocalStorageAvailable = () => {
  try {
    const testKey = "__test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

// Función para guardar un valor en el localStorage
const setItem = (key: string, value: any) => {
  if (isLocalStorageAvailable()) {
    try {
      // Convertimos el valor a JSON antes de almacenarlo
      const stringifiedValue = JSON.stringify(value);
      localStorage.setItem(key, stringifiedValue);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  } else {
    console.warn("localStorage is not available");
  }
};

// Función para obtener un valor del localStorage
const getItem = (key: string) => {
  if (isLocalStorageAvailable()) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error retrieving from localStorage:", error);
      return null;
    }
  }
  console.warn("localStorage is not available");
  return null;
};

// Función para eliminar un item del localStorage
const removeItem = (key: string) => {
  if (isLocalStorageAvailable()) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  } else {
    console.warn("localStorage is not available");
  }
};

// Función para limpiar todo el localStorage
const clear = () => {
  if (isLocalStorageAvailable()) {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  } else {
    console.warn("localStorage is not available");
  }
};

export const localStorageHelper = {
  setItem,
  getItem,
  removeItem,
  clear,
};
