import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonSearchbar,
  IonRow,
  IonCol,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonItem,
  SearchbarChangeEventDetail,
  SelectChangeEventDetail,
  IonHeader,
} from '@ionic/angular/standalone';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ListItemComponent } from 'src/app/components/list-item/list-item.component';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/models/item';

interface SearchbarCustomEvent extends CustomEvent {
  detail: SearchbarChangeEventDetail;
  target: HTMLIonSearchbarElement;
}

interface SelectCustomEvent<T = orderEnum> extends CustomEvent {
  detail: SelectChangeEventDetail<T>;
  target: HTMLIonSelectElement;
}

enum orderEnum {
  DEFAULT = 'Default',
  ASC = 'ASC',
  DESC = 'DESC',
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    IonItem,
    IonButton,
    IonCol,
    IonRow,
    IonSearchbar,
    CommonModule,
    HeaderComponent,
    IonSelect,
    IonSelectOption,
    ListItemComponent,
    RouterModule,
    AsyncPipe,
    IonHeader,
    IonContent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private itemService: ItemsService
  ) {}

  public orderEnum = orderEnum;
  public searchInput = new BehaviorSubject('');
  public sortOrder = new BehaviorSubject<orderEnum>(this.orderEnum.DEFAULT);
  public isLogin$ = this.authService.user$.pipe(map((user) => !!user));
  public items$ = combineLatest([this.itemService.items$, this.sortOrder]).pipe(
    map(([items, sortOrder]) => {
      return this.sortItems(items, sortOrder);
    })
  );

  ngOnInit() {
    this.itemService.loadItems();
  }

  searchOnChange(event: SearchbarCustomEvent) {
    if (typeof event.detail.value === 'string') {
      this.searchInput.next(event.detail.value);
    }
  }

  onOrderChange(event: SelectCustomEvent) {
    this.sortOrder.next(event.detail.value);
  }

  onButtonSearch() {
    this.itemService.getItemsByTitle(this.searchInput.value)
  }

  sortItems(items: Item[], sortOrder: orderEnum): Item[] {
    return [...items].sort((itemA, itemB) => {
      switch (sortOrder) {
        case this.orderEnum.DEFAULT:
          return 0;
        case this.orderEnum.ASC:
          return itemA.title.localeCompare(itemB.title);
        case this.orderEnum.DESC:
          return itemB.title.localeCompare(itemA.title);
        default:
          return 0;
      }
    });
  }
}
