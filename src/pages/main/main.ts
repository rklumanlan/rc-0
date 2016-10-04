import {Component} from '@angular/core';
import {NavParams, NavController,AlertController} from 'ionic-angular';

import {UniPage} from '../uni-page/uni-page';

import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';



declare var google;

@Component({
  selector: 'main',
  templateUrl: 'main.html'
})
export class MainPage {

  public geolocation2: any = "";
  public details: any;
  // public TabsPage:any = TabsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public geolocationService: GeolocationService, public connectivity: ConnectivityService) {
    this.details = this.navParams.get('geoloc');
    console.log(this.details);
    this.geolocation2 = this.details.locationName;

    // this.dataService.importDB();
  }

  autocomplete2(searchbar){
    console.log("autocomplete");
    var me = this;
    var latlng:any = {};
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('geolocation2').getElementsByTagName('input')[0]);
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
      this.geolocation2 = autolocString2;
      // console.log(me.latlng.locationName);
      // console.log(me.latlng.lat);
      console.log("autolocString2");
    });
  }

  showlatlong2(event) {
    var me = this;
    var geoCoords: any = {};
    console.log("entered shwolatlong2");
    //
    document.getElementById('mainBtnLoc').style.display = "none";
    document.getElementById('mainLoaderLoc').style.display = "inline";
    //
    console.log("geolocation working");
    //
    var options = {maximumAge: 0, timeout: 5000, enableHighAccuracy:true};
    navigator.geolocation.getCurrentPosition(

        (position) => {
            geoCoords.lat = position.coords.latitude;
            geoCoords.lng = position.coords.longitude;
            // this.geoCoords = position.coords.latitude  + ',' + position.coords.longitude;

            var gCoords = position.coords.latitude  + ',' + position.coords.longitude;
            console.log(geoCoords);
             this.geolocationService.setLocationName(gCoords).then(function(locName) { // `delay` returns a promise
                // Log the value once it is resolved
             me.geolocation2 = locName;
             console.log(locName);

             if (me.geolocation2!==null) {
               document.getElementById('mainBtnLoc').style.display = "inline";
               document.getElementById('mainLoaderLoc').style.display = "none";
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
    var me = this;
    me.geolocationService.locErrMsg();
    document.getElementById('mainBtnLoc').style.display = "inline";
    document.getElementById('mainLoaderLoc').style.display = "none";
  }
  //
  nextPage(ctr){
    console.log('nextPage(ctr)');
    var ctr;
    var me = this;
    var latlng = me.geolocationService.getLatlng();
    console.log(me.details.locationName);
    console.log(latlng.locationName);
    //push another page onto the history stack
    //causing the nav controller to animate the new page in

    var geoloc;

    if (latlng.locationName!=undefined) {
      console.log('aaaaaaaa');
      geoloc = latlng;

    }
    else{
      console.log('bbbbbb');
      geoloc = me.details;
      console.log(geoloc);
    }

    if(me.connectivity.isOnline()){
      this.navCtrl.push( UniPage, {geoloc: geoloc, page:ctr} );
    }
    else {
        me.geolocationService.netErrMsg();
    }
  }

}
