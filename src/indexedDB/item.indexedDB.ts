import { openDB, CONTAINER_STORE } from ".";
import { Container } from "@/types/container.type";
import { Item } from "@/types/item.type";

// Function to create, update, delete item
export const updateItems = async (
  containerId: string,
  updatedItems: Item[]
): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(CONTAINER_STORE, "readwrite");
    const store = transaction.objectStore(CONTAINER_STORE);

    const container = await new Promise<Container>((resolve, reject) => {
      const request = store.get(containerId);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error("Failed to retrieve container"));
    });

    container.items = updatedItems;

    await new Promise<void>((resolve, reject) => {
      const updateRequest = store.put(container);

      updateRequest.onsuccess = () => resolve();
      updateRequest.onerror = () =>
        reject(new Error("Failed to update items within the container"));
    });

    transaction.oncomplete = () => {};
    transaction.onerror = (event) => {
      throw new Error(
        `Transaction error: ${(event.target as IDBRequest).error}`
      );
    };
    transaction.onabort = (event) => {
      throw new Error(
        `Transaction aborted: ${(event.target as IDBRequest).error}`
      );
    };
  } catch (error: any) {
    throw new Error(`Update failed: ${error.message}`);
  }
};

// Function to read items
export const getListItems = async (
  id: string
): Promise<Container | undefined> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(CONTAINER_STORE, "readonly");
    const store = transaction.objectStore(CONTAINER_STORE);

    const container = await new Promise<Container | undefined>(
      (resolve, reject) => {
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      }
    );

    return container;
  } catch (error: any) {
    throw new Error(`Failed to get list items: ${error.message}`);
  }
};
