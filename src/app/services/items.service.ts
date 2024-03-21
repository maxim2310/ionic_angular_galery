import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  delay,
  map,
} from 'rxjs';
import { Item } from 'src/models/item';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private items = new BehaviorSubject<Item[]>([]);
  items$: Observable<Item[]> = this.items.asObservable();

  private loading = new BehaviorSubject(false);
  loading$: Observable<boolean> = this.loading.asObservable();

  constructor(private httpClient: HttpClient) {}

  public loadItems() {
    this.loading.next(true);

    this.httpClient
      .get<Item[]>('assets/data/items.json')
      .pipe(delay(2000))
      .subscribe((items) => {
        this.items.next(items);
        this.loading.next(false);
      });
  }

  public getItemsByTitle(titleQuery: string) {
    this.loading.next(true);

    this.httpClient
      .get<Item[]>('assets/data/items.json')
      .pipe(
        delay(2000),
        map((items) =>
          items.filter((item) =>
            item.title
              .toLocaleLowerCase()
              .includes(titleQuery.toLocaleLowerCase())
          )
        )
      )
      .subscribe((items) => {
        this.items.next(items);
        this.loading.next(false);
      });
  }
}
