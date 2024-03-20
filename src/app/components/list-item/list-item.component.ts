import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonText,
  IonImg,
} from '@ionic/angular/standalone';
import { Item } from 'src/models/item';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [IonImg, IonText, CommonModule, IonCard, IonCardContent],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  @Input({ required: true }) item!: Item;
}
