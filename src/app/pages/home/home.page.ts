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
import { addIcons } from 'ionicons';
import { personOutline, search } from 'ionicons/icons';
import { delay, map } from 'rxjs';
import { SwiperConfigDirective } from 'src/app/directives/swiper-config.directive';
import { ItemsService } from 'src/app/services/items.service';
import { SwiperOptions } from 'swiper/types/swiper-options';

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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('swiper') swiper!: ElementRef;

  constructor(
    private itemService: ItemsService,
    private destroyRef: DestroyRef
  ) {
    addIcons({ personOutline, search });
  }

  public items$ = this.itemService.items$;
  public itemImages$ = this.itemService.items$.pipe(
    map((items) => items.filter((_, index) => index < 4).map(item => item.url))
  );
  public swiperConfig: SwiperOptions = {
    modules: [IonicSlides],
    pagination: true,
    autoplay: {
      delay: 500,
    },
    speed: 500,
    loop: true,
    slidesPerView: 1,
    observeParents: true,
    observeSlideChildren: true,
    observer: true,
    resizeObserver: true,
  };

  ngOnInit() {
    this.itemService.loadItems();
  }

  ngAfterViewInit() {
    this.itemService.items$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        delay(100)
      )
      .subscribe((items) => {
        console.log('refresh');

        this.refreshSwiper()
      });
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
}
