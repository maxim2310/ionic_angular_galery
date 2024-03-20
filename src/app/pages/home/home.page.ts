import { AsyncPipe, CommonModule } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
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
} from '@ionic/angular/standalone';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, map } from 'rxjs';
import { SwiperConfigDirective } from 'src/app/directives/swiper-config.directive';
import { ItemsService } from 'src/app/services/items.service';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { ListItemComponent } from 'src/app/components/list-item/list-item.component';
import { NavigationService } from 'src/app/services/navigation.service';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { Item } from 'src/models/item';

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
    HeaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit, AfterViewInit {

  public sizeDesktop = 9;
  public sizeMobile = 12;
  public isLogin$ = this.authService.user$.pipe(map(v => !!v));
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
    private destroyRef: DestroyRef
  ) {

  }

  ngOnInit() {
    this.itemService.loadItems();
  }

  ngAfterViewInit() {
    this.itemService.items$
      .pipe(takeUntilDestroyed(this.destroyRef), delay(100))
      .subscribe((items) => {
        this.refreshSwiper();
      });
  }

  refreshSwiper() {
    if (this.swiper) {
      this.swiper.nativeElement.swiper.loopDestroy();
      this.swiper.nativeElement.swiper.loopCreate();
      this.swiper.nativeElement.swiper.activeIndex = 0;
      this.swiper.nativeElement.swiper.update();
      // this.swiper.nativeElement.swiper.autoplay.start();
    }
  }

  selectItem(item: Item) {
    this.navService.itemDetails(item.id)
  }

  toLogin() {
    this.navService.login();
  }
  logOut() {
    this.authService.logOut();
  }
}
