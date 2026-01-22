// frontend/src/shared/services/storage/localStorage.service.js
export const storage = {
  get(key) {
    try {
      const item = localStorage.getItem(key);
      if (item === null || item === "undefined") return null;
      return JSON.parse(item);
    } catch (error) {
      console.error(`Erro ao ler ${key} do localStorage:`, error);
      return null;
    }
  },

  set(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error(`Erro ao salvar ${key} no localStorage:`, error);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Erro ao remover ${key} do localStorage:`, error);
      return false;
    }
  },

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Erro ao limpar localStorage:", error);
      return false;
    }
  },
};
