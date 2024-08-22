import { openDB, CONTAINER_STORE } from ".";
import { Container } from "@/types/container.type";

// Function to add a container
export const addContainer = async (container: Container): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(CONTAINER_STORE, "readwrite");
    const store = transaction.objectStore(CONTAINER_STORE);

    await new Promise<void>((resolve, reject) => {
      const request = store.add(container);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error("Failed to add container"));
    });
  } catch (error: any) {
    throw new Error(`Add container failed: ${error.message}`);
  }
};

// Function to edit a container's title
export const editContainer = async (
  containerId: string,
  newTitle: string
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

    container.title = newTitle;

    await new Promise<void>((resolve, reject) => {
      const updateRequest = store.put(container);

      updateRequest.onsuccess = () => resolve();
      updateRequest.onerror = () =>
        reject(new Error("Failed to update container title"));
    });
  } catch (error: any) {
    throw new Error(`Edit container failed: ${error.message}`);
  }
};

// Function to delete a container
export const deleteContainer = async (id: string): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(CONTAINER_STORE, "readwrite");
    const store = transaction.objectStore(CONTAINER_STORE);

    await new Promise<void>((resolve, reject) => {
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error("Failed to delete container"));
    });
  } catch (error: any) {
    throw new Error(`Delete container failed: ${error.message}`);
  }
};

// Function to get all containers
export const getAllContainers = async (): Promise<Container[]> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(CONTAINER_STORE, "readonly");
    const store = transaction.objectStore(CONTAINER_STORE);

    return await new Promise<Container[]>((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result as Container[]);
      request.onerror = () =>
        reject(new Error("Failed to retrieve containers"));
    });
  } catch (error: any) {
    throw new Error(`Get all containers failed: ${error.message}`);
  }
};
