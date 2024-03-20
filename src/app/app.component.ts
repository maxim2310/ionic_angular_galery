import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonImg } from '@ionic/angular/standalone';
import { ItemsService } from './services/items.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonImg, IonApp, IonRouterOutlet, AsyncPipe],
})
export class AppComponent {
  public loading$ = this.itemService.loading$;
  constructor(private itemService: ItemsService) {}
}
