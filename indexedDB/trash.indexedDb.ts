import { openDB, TRASH_STORE } from ".";
import { Item } from "../types/item.type";

interface ContainerTrash {
  id: string;
  items: Item[];
}

// Function to add a container of trash
export const addContainerTrash = async (
  containerTrash: ContainerTrash
): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(TRASH_STORE, "readwrite");
    const store = transaction.objectStore(TRASH_STORE);

    await new Promise<void>((resolve, reject) => {
      const request = store.add(containerTrash);

      request.onsuccess = () => resolve();
      request.onerror = () =>
        reject(new Error("Failed to add container trash"));
    });
  } catch (error: any) {
    throw new Error(`Add container trash failed: ${error.message}`);
  }
};

// Function to delete a container of trash
export const deleteContainerTrash = async (id: string): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(TRASH_STORE, "readwrite");
    const store = transaction.objectStore(TRASH_STORE);

    await new Promise<void>((resolve, reject) => {
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () =>
        reject(new Error("Failed to delete container trash"));
    });
  } catch (error: any) {
    throw new Error(`Delete container trash failed: ${error.message}`);
  }
};

// Function to get all containers of trash
export const getAllContainerTrash = async (): Promise<ContainerTrash[]> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(TRASH_STORE, "readonly");
    const store = transaction.objectStore(TRASH_STORE);

    return await new Promise<ContainerTrash[]>((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result as ContainerTrash[]);
      request.onerror = () =>
        reject(new Error("Failed to retrieve containers trash"));
    });
  } catch (error: any) {
    throw new Error(`Get all container trash failed: ${error.message}`);
  }
};

// Function to update items in a container of trash
export const updateTrash = async (
  containerTrashId: string,
  updatedItems: Item[]
): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(TRASH_STORE, "readwrite");
    const store = transaction.objectStore(TRASH_STORE);

    const containerTrash = await new Promise<ContainerTrash>(
      (resolve, reject) => {
        const request = store.get(containerTrashId);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () =>
          reject(new Error("Failed to retrieve container trash"));
      }
    );

    containerTrash.items = updatedItems;

    await new Promise<void>((resolve, reject) => {
      const updateRequest = store.put(containerTrash);

      updateRequest.onsuccess = () => resolve();
      updateRequest.onerror = () =>
        reject(new Error("Failed to update items within the container trash"));
    });
  } catch (error: any) {
    throw new Error(`Update trash failed: ${error.message}`);
  }
};

// Function to get a specific container of trash
export const getTrash = async (
  id: string
): Promise<ContainerTrash | undefined> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(TRASH_STORE, "readonly");
    const store = transaction.objectStore(TRASH_STORE);

    return await new Promise<ContainerTrash | undefined>((resolve, reject) => {
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () =>
        reject(new Error("Failed to retrieve container trash"));
    });
  } catch (error: any) {
    throw new Error(`Get trash failed: ${error.message}`);
  }
};
