import { NgModule} from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { LandingPage } from '../pages/landingpage/landingpage';
import { MainPage } from '../pages/main/main';
import { UniPage } from '../pages/uni-page/uni-page';
import { UniDetailPage } from '../pages/uni-detail-page/uni-detail-page';
import { UniMapPage } from '../pages/uni-map-page/uni-map-page';
import { TabsPage } from '../pages/jeepney/tabs/tabs';
import { JeepRoutesPage } from '../pages/jeepney/jeep-routes/jeep.view';
import { JeepDetailsPage } from '../pages/jeepney/jeep-routes/jeep.details';
import { JeepMapsPage } from '../pages/jeepney/jeep-routes/jeep.map';
import { FindRoutesPage } from '../pages/jeepney/find-routes/routes.view';
import { MyModal } from '../pages/jeepney/find-routes/modal';
import { RoutesMapsPage } from '../pages/jeepney/find-routes/routes.map';


import {GeolocationService} from './../providers/geolocation-service/geolocation-service'
import {GoogleMapsService} from './../providers/google-maps-service/google-maps-service'
import {ConnectivityService} from './../providers/connectivity-service/connectivity-service';
import {DataService} from './../providers/data-service/data-service';



import {BrowserModule} from "@angular/platform-browser";
import {HttpModule, Http} from '@angular/http';
import {TranslateService, TranslateLoader, TranslateStaticLoader, TranslateModule} from 'ng2-translate/ng2-translate';


export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

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
    JeepDetailsPage,
    JeepMapsPage,
    FindRoutesPage,
    MyModal,
    RoutesMapsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      iconMode: 'md',
      backButtonIcon: 'ios-arrow-back',
      backButtonText: '',
      tabsPlacement: 'top',
      prodMode: true
    }),
    BrowserModule,
        HttpModule,
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [Http]
        })
    ],
  exports: [BrowserModule, HttpModule, TranslateModule],
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
    JeepDetailsPage,
    JeepMapsPage,
    FindRoutesPage,
    MyModal,
    RoutesMapsPage
  ],
  providers: [GeolocationService,ConnectivityService, DataService, GoogleMapsService]
})
export class AppModule {}
