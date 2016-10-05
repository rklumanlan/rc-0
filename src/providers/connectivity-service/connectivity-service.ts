import {Injectable} from '@angular/core';
import {Network} from 'ionic-native';
import {Platform} from 'ionic-angular';

@Injectable()
export class ConnectivityService {

  onDevice: boolean;

  constructor(public platform: Platform){
    console.log("connectivityService");
    this.onDevice = this.platform.is('cordova');
  }

  isOnline(): boolean {
    console.log(Network.connection);
    if(this.onDevice && Network.connection){
      console.log(Network.connection !== 'none');
      return Network.connection !== 'none';
    } else {
      console.log(navigator.onLine);
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if(this.onDevice && Network.connection){
      return Network.connection === 'none';
    } else {
      return !navigator.onLine;
    }
  }
}
