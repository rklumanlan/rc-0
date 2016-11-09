import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {JeepMapsPage} from '../../jeepney/jeep-routes/jeep.map';
import {DataService} from '../../../providers/data-service/data-service';
import {ConnectivityService} from '../../../providers/connectivity-service/connectivity-service';
import {GoogleMapsService} from '../../../providers/google-maps-service/google-maps-service';

@Component({
  templateUrl: 'jeep.details.html'
})

export class JeepDetailsPage {

  public details: any;
  public jeepDetails: any;
  public disable: any;

  constructor(public dataService: DataService, public navParams: NavParams, public navCtrl: NavController, public connectivity: ConnectivityService, public googleMapsService: GoogleMapsService){
    this.details = navParams.get('jeep');

    console.log(this.details.name);
    console.log('should enter data service');

    this.jeepDetails = [];

    this.dataService.getJeepDetails(this.details.name).then((data) => {
      // console.log(data.result);
      console.log(data);
      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          console.log(data.rows.item(i));
          this.jeepDetails.push({name: data.rows.item(i).name, color: data.rows.item(i).color, image:data.rows.item(i).image, route:data.rows.item(i).route, route2:data.rows.item(i).route2,coordi:data.rows.item(i).coordi});
       }
      }
      console.log(this.jeepDetails);
    }, (error) => {
      console.log("ERROR -> " + JSON.stringify(error.err));
    });
  }

  presentModal() {
    var me = this;
    console.log('present modal');
    console.log(this.jeepDetails[0] );


    if(me.connectivity.isOnline()){
        me.navCtrl.push(JeepMapsPage, { jeep: this.jeepDetails[0] });
    }
    else {
        console.log("disabling map");
        me.googleMapsService.disableMap();
        me.navCtrl.pop();
    }
  }
}
