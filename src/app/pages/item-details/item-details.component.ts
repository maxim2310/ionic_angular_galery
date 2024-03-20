import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { EMPTY, Observable, map, of, switchMap } from 'rxjs';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from 'src/app/services/items.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Item } from 'src/models/item';
import {
  IonContent,
  IonRow,
  IonCol,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonItem,
    IonCol,
    IonRow,
    IonContent,
    CommonModule,
    HeaderComponent,
  ],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailsComponent {
  @Input() id = '';

  constructor(
    private itemService: ItemsService,
    private authService: AuthService,
    private navService: NavigationService
  ) {}

  public isLogin$ = this.authService.user$.pipe(map((user) => !!user));

  public item$: Observable<Item | null> = this.itemService.items$.pipe(
    map((items) => {
      if (!items.length) {
        this.itemService.loadItems();
        return null;
      }
      return items.find((item) => item.id === this.id) || null;
    })
  );

  toLogin() {
    this.navService.login();
  }
  logOut() {
    this.authService.logOut();
    this.navService.home();
  }
  backHome() {
    this.navService.home();
  }
}
