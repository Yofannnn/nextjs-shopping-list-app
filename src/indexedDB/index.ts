const DB_NAME = "ShoppingListDB";
const DB_VERSION = 1;
const CONTAINER_STORE = "container";
const TRASH_STORE = "trash";

// Function to open the IndexedDB
const openDB = async (): Promise<IDBDatabase> => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      try {
        if (!db.objectStoreNames.contains(CONTAINER_STORE)) {
          db.createObjectStore(CONTAINER_STORE, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(TRASH_STORE)) {
          db.createObjectStore(TRASH_STORE, { keyPath: "id" });
        }
      } catch (error: any) {
        reject(new Error(`Upgrade needed failed: ${error.message}`));
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(new Error(`Failed to open database: ${request.error?.message}`));
    };
  });
};

export { openDB, CONTAINER_STORE, TRASH_STORE };
