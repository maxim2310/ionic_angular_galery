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
    const storage = await this.storage.create();
    this._storage = storage;
  }

  saveData(key: string, data: any) {
    this.storage.set(key, JSON.stringify(data));
  }

  getData(key: string): Promise<any> {
    return this.storage.get(key).then((data) => JSON.parse(data));
  }

  removeData(key: string) {
    return this.storage.remove(key);
  }

  resetStorage() {
    this.storage.clear()
  }
}
