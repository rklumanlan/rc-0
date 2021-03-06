import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';

import { LandingPage } from '../pages/landingpage/landingpage';
import { MainPage } from '../pages/main/main';
import { UniPage } from '../pages/uni-page/uni-page';
import { UniDetailPage } from '../pages/uni-detail-page/uni-detail-page';
import { UniMapPage } from '../pages/uni-map-page/uni-map-page';

import {GeolocationService} from './../providers/geolocation-service/geolocation-service'
import {ConnectivityService} from './../providers/connectivity-service/connectivity-service';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    MainPage,
    HomePage,
    LandingPage,
    UniPage,
    UniDetailPage,
    UniMapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    MainPage,
    HomePage,
    LandingPage,
    UniPage,
    UniDetailPage,
    UniMapPage
  ],
  providers: [GeolocationService, ConnectivityService]
})
export class AppModule {}
