import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonHeader, IonToolbar, IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { personOutline, search } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonIcon, IonButton, IonToolbar, IonHeader,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  @Input({required: true}) isLogin!: boolean | null

  @Output() login = new EventEmitter()
  @Output() logOut = new EventEmitter()
  @Output() clickLogo = new EventEmitter()

  constructor() {
    addIcons({ personOutline, search });
  }
 }
