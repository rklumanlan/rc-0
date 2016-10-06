import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { LandingPage } from '../pages/landingpage/landingpage';
import { MainPage } from '../pages/main/main';
import { UniPage } from '../pages/uni-page/uni-page';
import { UniDetailPage } from '../pages/uni-detail-page/uni-detail-page';
import { UniMapPage } from '../pages/uni-map-page/uni-map-page';
import { TabsPage } from '../pages/jeepney/tabs/tabs';
import { JeepRoutesPage } from '../pages/jeepney/jeep-routes/jeep.view';
import { FindRoutesPage } from '../pages/jeepney/find-routes/routes.view';


import {GeolocationService} from './../providers/geolocation-service/geolocation-service'
import {ConnectivityService} from './../providers/connectivity-service/connectivity-service';
import {DataService} from './../providers/data-service/data-service';




@NgModule({
  declarations: [
    MyApp,
    MainPage,
    LandingPage,
    UniPage,
    UniDetailPage,
    UniMapPage,
    TabsPage,
    JeepRoutesPage,
    FindRoutesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
    iconMode: 'md',
    backButtonIcon: 'ios-arrow-back',
    backButtonText: '',
    tabsPlacement: 'top',
    prodMode: true
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainPage,
    LandingPage,
    UniPage,
    UniDetailPage,
    UniMapPage,
    TabsPage,
    JeepRoutesPage,
    FindRoutesPage
  ],
  providers: [GeolocationService, ConnectivityService, DataService]
})
export class AppModule {}
