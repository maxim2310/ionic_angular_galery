import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  IonIcon,
  IonHeader,
  IonToolbar,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonCard,
  IonRow,
  IonCol,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonNote,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosedOutline, mailOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    IonNote,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonCol,
    IonRow,
    IonCard,
    IonInput,
    IonLabel,
    IonItem,
    IonContent,
    IonButton,
    IonToolbar,
    IonHeader,
    IonIcon,
    CommonModule,
    IonIcon,
    ReactiveFormsModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  form: FormGroup;
  errors = {
    required: 'This field is required',
    email: 'Please enter a valid email address.',
    minLength: 'This field must have length at least 6',
    notSame: 'This field must match the password field',
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private navService: NavigationService
  ) {
    addIcons({ lockClosedOutline, mailOutline });

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, this._isPasswordMatch()]],
    });
  }

  private _isPasswordMatch(): ValidatorFn {
    return () => {
      const pass = this.form?.get('password')?.value;
      const confirmPass = this.form?.get('rePassword')?.value;
      return pass === confirmPass ? null : { notSame: true };
    };
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
      await this.authService.createUser(this.form.value);
      this.navService.home()
    } catch (error: any) {
      if (error.message) {
        const alert = await this.alertController.create({
          header: error.message,
          buttons: ['Close'],
        });

        await alert.present();
        this.form.reset();
      } else {
        console.error('Something went wrong while creating the user', error);
      }
    }
  }
}
