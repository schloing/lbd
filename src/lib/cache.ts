// // shitty for general use
// // convenient only if generated automatically based on schema
// class LibCache {
//     private db: IDBDatabase | undefined;

//     constructor() {
//         const DBOpenRequest = indexedDB.open("bored");

//         DBOpenRequest.onsuccess = (event) => {
//             this.db = DBOpenRequest.result;
//         }

//         DBOpenRequest.onupgradeneeded = (event) => {
//             this.db = (<IDBRequest>event.target).result;

//             if (!this.db) return;

//             const boardObjectStore = this.db.createObjectStore('boards', { keyPath: 'id' });

//             boardObjectStore.createIndex('name', 'name', { unique: false });
//             boardObjectStore.createIndex('owner', 'owner', { unique: false });
//             boardObjectStore.createIndex('participants', 'participants', { unique: false });
//             boardObjectStore.createIndex('points', 'points', { unique: false });
//             boardObjectStore.createIndex('createdAt', 'createdAt', { unique: false });
//             boardObjectStore.createIndex('updatedAt', 'updatedAt', { unique: false });

//             const userObjectStore = this.db.createObjectStore('users', { keyPath: 'id' });

//             userObjectStore.createIndex('username', 'username', { unique: true });
//             userObjectStore.createIndex('display', 'display', { unique: false });
//             userObjectStore.createIndex('createdAt', 'createdAt', { unique: false });
//             userObjectStore.createIndex('updatedAt', 'updatedAt', { unique: false });
//         };
//     }

//     public async do(operation: "add" | "remove", objectStoreName: "boards" | "users",
//         value: { id: IDBValidKey | IDBKeyRange; }) {
//         let status: boolean = false;
//         if (!this.db) return status;
//         const transaction = this.db.transaction([objectStoreName], "readwrite");
//         const objectStore = transaction.objectStore(objectStoreName);

//         switch (operation) {
//             case "add":
//                 objectStore.add(value);
//                 break;

//             case "remove":
//                 objectStore.delete(value.id);
//                 break;
//         }

//         transaction.oncomplete = () => status = true;
//         return status;
//     }

//     public async getIn(objectStoreName: string, id: IDBValidKey | IDBKeyRange): Promise<object | null> {
//         let obj: object | null = null;
//         if (!this.db) return null;
//         const transaction = this.db.transaction([objectStoreName], "readwrite");
//         const objectStore = transaction.objectStore(objectStoreName);

//         objectStore.openCursor().onsuccess = (event) => {
//             const cursor = (<IDBRequest>event.target).result;
//             if (!cursor) return;
//             if (cursor.value.id == id) {
//                 obj = cursor.value;
//                 return;
//             }
//             cursor.continue();
//         }

//         return obj;
//     }
// }

// export const cache = new LibCache();