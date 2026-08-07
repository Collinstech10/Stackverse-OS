import { collection, doc, onSnapshot, setDoc, deleteDoc, writeBatch, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export function subscribeToCollection<T extends { id: string }>(
  collectionName: string,
  onData: (items: T[]) => void,
  onError?: (err: Error) => void
) {
  const colRef = collection(db, collectionName);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: T[] = snapshot.docs.map(d => ({
        ...d.data(),
        id: d.id
      } as unknown as T));
      onData(items);
    },
    (error) => {
      console.warn(`Firestore listener error on ${collectionName}:`, error);
      if (onError) onError(error);
    }
  );
}

export async function saveToCollection<T extends { id: string }>(
  collectionName: string,
  item: T
) {
  try {
    const docRef = doc(db, collectionName, item.id);
    await setDoc(docRef, item, { merge: true });
  } catch (error) {
    console.error(`Error saving to Firestore (${collectionName}):`, error);
  }
}

export async function removeFromCollection(
  collectionName: string,
  id: string
) {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting from Firestore (${collectionName}):`, error);
  }
}

export async function clearCollection(collectionName: string) {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) return;
    const batch = writeBatch(db);
    snapshot.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();
  } catch (error) {
    console.error(`Error clearing Firestore collection (${collectionName}):`, error);
  }
}
