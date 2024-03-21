import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonContent,
  IonRow,
  IonCardHeader,
  IonLabel,
  IonInput,
  IonCardContent,
  IonCardTitle,
  IonCol,
  IonCard,
  IonNote,
  IonCardSubtitle,
  IonItem,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosedOutline, mailOutline } from 'ionicons/icons';
import { map } from 'rxjs';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    IonItem,
    IonCardSubtitle,
    ReactiveFormsModule,
    IonNote,
    IonCard,
    IonCol,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonLabel,
    IonCardHeader,
    IonRow,
    IonContent,
    IonIcon,
    IonButton,
    IonToolbar,
    IonHeader,
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form: FormGroup;
  errors = {
    required: 'This field is required',
    email: 'Please enter a valid email address.',
  };
  public isLogin$ = this.authService.user$.pipe(map((user) => !!user));

  constructor(private fb: FormBuilder, private navService: NavigationService, private authService: AuthService, private alertController: AlertController) {
    addIcons({ lockClosedOutline, mailOutline });

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  getControl(formControl: string) {
    return this.form.get(formControl);
  }

  getError(formControl: string) {
    if (this.getControl(formControl)?.touched) {
      if (
        this.getControl(formControl) &&
        this.getControl(formControl)?.errors
      ) {
        const firstError = Object.keys(
          this.getControl(formControl)?.errors as { [key: string]: boolean }
        )[0];

        return this.errors[firstError as keyof typeof this.errors];
      }
    }

    return '';
  }

  async onSubmit() {
    try {
      await this.authService.login(this.form.value);
      this.navService.home()
    } catch (error: any) {
      if (error.message) {
        const alert = await this.alertController.create({
          header: error.message,
          buttons: ['Close'],
        });

        await alert.present();
      } else {
        console.error('Something went wrong while creating the user', error);
      }
    }
  }

  toSignUp() {
    this.navService.registration()
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
}
