import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Save user data to local storage
  saveData(key: string, data: any) {
    this.storage.set(key, JSON.stringify(data));
  }

  // Retrieve user data from local storage
  getData(key: string): Promise<any> {
    return this.storage.get(key).then((data) => JSON.parse(data));
  }

  // Clear user data from local storage (e.g., on logout)
  removeData(key: string) {
    return this.storage.remove(key);
  }

  resetStorage() {
    this.storage.clear()
  }
}
