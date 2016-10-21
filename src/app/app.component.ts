import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { LandingPage } from '../pages/landingpage/landingpage';

import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LandingPage;

  constructor(platform: Platform, translate: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('ja');

     // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('ja');
  }
}
