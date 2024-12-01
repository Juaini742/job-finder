import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null); // Mengembalikan null untuk SSR
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value); // Tidak menyimpan apa-apa di SSR
    },
    removeItem(_key: any) {
      return Promise.resolve(); // Tidak melakukan apa-apa di SSR
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;
