import { AsyncPipe, CommonModule } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonicSlides,
  ModalController,
} from '@ionic/angular/standalone';
import { EMPTY, Subject, delay, map, switchMap, take, takeUntil, timer } from 'rxjs';
import { SwiperConfigDirective } from 'src/app/directives/swiper-config.directive';
import { ItemsService } from 'src/app/services/items.service';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { ListItemComponent } from 'src/app/components/list-item/list-item.component';
import { NavigationService } from 'src/app/services/navigation.service';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { Item } from 'src/models/item';
import { RouterModule } from '@angular/router';
import { ShortInfoModalComponent } from 'src/app/components/short-info-modal/short-info-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    AsyncPipe,
    CommonModule,
    IonButton,
    IonIcon,
    SwiperConfigDirective,
    ListItemComponent,
    HeaderComponent,
    RouterModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit, AfterViewInit {
  public destroy$ = new Subject()
  public isLogin$ = this.authService.user$.pipe(map((user) => !!user));
  public items$ = this.itemService.items$;
  public itemImages$ = this.itemService.items$.pipe(
    map((items) =>
      items.filter((_, index) => index < 3).map((item) => item.url)
    )
  );
  public swiperConfig: SwiperOptions = {
    modules: [IonicSlides],
    pagination: true,
    autoplay: {
      delay: 1000,
    },
    speed: 500,
    loop: true,
    slidesPerView: 1,
  };

  @ViewChild('swiper') swiper?: ElementRef;

  constructor(
    private itemService: ItemsService,
    private navService: NavigationService,
    private authService: AuthService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.itemService.loadItems();
    this.showIfGuest();
  }


  ngAfterViewInit() {
    this.itemService.items$
      .pipe(takeUntil(this.destroy$), delay(100))
      .subscribe(() => {
        this.refreshSwiper();
      });
  }

  ionViewWillLeave() {
    this.destroy$.next(null)
  }

  refreshSwiper() {
    if (this.swiper) {
      this.swiper.nativeElement.swiper.loopDestroy();
      this.swiper.nativeElement.swiper.loopCreate();
      this.swiper.nativeElement.swiper.activeIndex = 0;
      this.swiper.nativeElement.swiper.update();
      this.swiper.nativeElement.swiper.autoplay.start();
    }
  }

  selectItem(item: Item) {
    this.isLogin$.pipe(take(1)).subscribe(async (isLoggedIn) => {
      if (isLoggedIn) {
        this.navService.itemDetails(item.id);
      } else {
        const result = await ShortInfoModalComponent.show(this.modalCtrl, {
          header: 'Log in to continue',
          desc: 'To continue you have to log in',
        });

        if (result === 'ok') {
          this.navService.login();
        }
      }
    });
  }

  showIfGuest(): void {
    this.isLogin$
      .pipe(
        takeUntil(this.destroy$),
        take(1),
        switchMap((isLogin) => {
          if (!isLogin) {
            return timer(30000).pipe(
              takeUntil(this.destroy$),
              take(1),
              switchMap(() => {
                return ShortInfoModalComponent.show(this.modalCtrl, {
                  header: 'Please log in',
                  desc: 'Access more by joining our platform',
                });
              })
            );
          }
          return EMPTY;
        })
      )
      .subscribe((result) => {
        if (result === 'ok') {
          this.navService.login();
        }
      });
  }
}
