import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ModalController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonContent,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonCardTitle,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-short-info-modal',
  standalone: true,
  imports: [
    IonIcon,
    IonCardTitle,
    IonButton,
    IonCardContent,
    IonCardHeader,
    IonContent,
    IonCard,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
  ],
  templateUrl: './short-info-modal.component.html',
  styleUrl: './short-info-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShortInfoModalComponent {
  public data!: { header: string; desc: string };

  constructor(private modalCtrl: ModalController) {
    addIcons({ closeCircleOutline })
  }

  static async show(
    modalCtrl: ModalController,
    data: { header: string; desc: string }
  ) {
    const modal = await modalCtrl.create({
      cssClass: 'short-info-modal auto-height',
      component: ShortInfoModalComponent,
      componentProps: {
        data,
      },
      showBackdrop: true,
      backdropDismiss: true,
    });
    await modal.present();
    const response = await modal.onDidDismiss();
    return response.data;
  }

  close() {
    this.modalCtrl.dismiss()
  }

  onOk() {
    this.modalCtrl.dismiss('ok')
  }
}
