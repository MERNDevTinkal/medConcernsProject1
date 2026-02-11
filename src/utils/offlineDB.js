import { openDB } from "idb";

const dbPromise = openDB("medconcerns-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("data")) {
      db.createObjectStore("data");
    }
  },
});

export async function saveData(key, value) {
  const db = await dbPromise;
  await db.put("data", value, key);
}

export async function getData(key) {
  const db = await dbPromise;
  return db.get("data", key);
}
