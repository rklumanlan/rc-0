import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';

import { LandingPage } from '../pages/landingpage/landingpage';
import { MainPage } from '../pages/main/main';
import { UniPage } from '../pages/uni-page/uni-page';

import {GeolocationService} from './../providers/geolocation-service/geolocation-service'
import {ConnectivityService} from './../providers/connectivity-service/connectivity-service';

import {LoadingModal} from './../components/loading-modal/loading-modal';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    MainPage,
    HomePage,
    LandingPage,
    UniPage,
    LoadingModal
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
    UniPage
  ],
  providers: [GeolocationService, ConnectivityService]
})
export class AppModule {}
