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

    var userLang = navigator.language.split('-')[0];
    userLang = /(ja|en)/gi.test(userLang) ? userLang : 'en';

    translate.setDefaultLang('en');

    translate.use(userLang);
  }




}
