import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, search } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonIcon, IonButton, IonToolbar, IonHeader, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input({ required: true }) isLogin!: boolean | null;
  @Input() isLoginButton = false;
  @Input() isSearchButton = false;

  constructor(
    private navService: NavigationService,
    private authService: AuthService
  ) {
    addIcons({ personOutline, search });
  }

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
  toSearch() {
    this.navService.search();
  }
}
