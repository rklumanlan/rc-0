import {Component} from '@angular/core';
import {NavParams, NavController, AlertController} from 'ionic-angular';

import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
//
// import {TranslatePipe} from "ng2-translate/ng2-translate";
//
import {MainPage} from '../main/main';

declare var google;

@Component({
  selector: 'landing-page',
  templateUrl: 'landingpage.html'
})

export class LandingPage {

  // rootPage: any = HomePage;

  public geolocation: any = "";
  // public mainPage: any =  MainPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public geolocationService: GeolocationService) {

  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter()");
    this.geolocationService.loadGeolocation();
  }

  autocomplete(searchbar){
    console.log("autocomplete");
    var me = this;
    var latlng:any = {};
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('geolocation').getElementsByTagName('input')[0]);
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      latlng.lat = place.geometry.location.lat();
      latlng.lng = place.geometry.location.lng();

      var autolocString = [];
      var autolocString2;



      console.log(place);

      for (var i = 0; i < place.address_components.length; i++) {

        if (place.address_components[i].types[0]!='administrative_area_level_2') {
          autolocString.push(place.address_components[i].long_name);
        }
        autolocString2 = autolocString.join(', ');
      }
      latlng.locationName = autolocString2;
      // console.log(me.latlng.locationName);
      // console.log(me.latlng.lat);
      console.log("autolocString2");
      this.navCtrl.push(MainPage, { geoloc: latlng });
    });
  }

  showlatlong(event) {
    var me = this;
    var geoCoords: any = {};
    console.log("entered shwo latlong");

    document.getElementById('lndBtnLoc').style.display = "none";
    document.getElementById('lndLoaderLoc').style.display = "inline";

    console.log("geolocation working");

    var options = {maximumAge: 0, timeout: 5000, enableHighAccuracy:true};

    console.log(this.geolocation);
    console.log(this.navCtrl);

    navigator.geolocation.getCurrentPosition(

        (position) => {
            geoCoords.lat = position.coords.latitude;
            geoCoords.lng = position.coords.longitude;
            // this.geoCoords = position.coords.latitude  + ',' + position.coords.longitude;

            var gCoords = position.coords.latitude  + ',' + position.coords.longitude;
            console.log(geoCoords);
             this.geolocationService.setLocationName(gCoords).then(function(locName) { // `delay` returns a promise
                // Log the value once it is resolved
             me.geolocation = locName;
             console.log(locName);

             geoCoords.locationName = locName;

             if (locName!==undefined) {
               document.getElementById('lndBtnLoc').style.display = "inline";
               document.getElementById('lndLoaderLoc').style.display = "none";
               console.log(me.navCtrl);
               console.log(geoCoords);
               setTimeout(function() {

                 me.navCtrl.push(MainPage, { geoloc: geoCoords });

               }, 2000);
             }


            });
        },

        (error) => {
          switch(error.code)
          {
          case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
          // case error.UNKNOWN_ERROR:
          //   console.log("An unknown error occurred.");
          //   break;
          }
            console.log(error.code);
            this.locErrMsg();
        }, options);

  }
  //
  locErrMsg(){
    // var me = this;
    // this.geolocationService.locErrMsg();
    document.getElementById('lndBtnLoc').style.display = "inline";
    document.getElementById('lndLoaderLoc').style.display = "none";
  }


}
