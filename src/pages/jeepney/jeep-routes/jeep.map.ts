import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {DataService} from '../../../providers/data-service/data-service';
import {GoogleMapsService} from '../../../providers/google-maps-service/google-maps-service';
// import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';

@Component({
  templateUrl: 'jeep.map.html'
})

export class JeepMapsPage {

  public jeep: any;
  public option: any;
  public points: any;

  constructor(public dataService: DataService, public navParams: NavParams, public googleMapsService: GoogleMapsService){
    console.log("jeep map cons");
    this.jeep= this.navParams.get('jeep');


    console.log(this.jeep. name);

    this.option = {};
    this.points = [];

    this.dataService.getPoints().then((data) => {
      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {


          if (this.check_marks(data.rows.item(i).tags,this.jeep.name)) {
            this.points.push({text: data.rows.item(i).text, lat: data.rows.item(i).lat, lng:data.rows.item(i).lng, tags:data.rows.item(i).tags, icon:data.rows.item(i).icon});
          }
        }
      }

    }, (error) => {
      console.log("ERROR -> " + JSON.stringify(error.err));
    });

    this.option.jeep_1 = this.jeep;
    this.option.marker_1 = this.points;
    console.log("contrctr")
    this.googleMapsService.loadGoogleMaps(this.option);
  }

  check_marks(tags,name){
    console.log('mappu'+document.getElementById('map'));
    console.log(tags);
    console.log(name);



    var stringTags = tags;
    var index = stringTags.split(",");

    if (index.indexOf(name)!=-1) {
      return true;
    }
  }

  ionViewDidLeave(){
    this.googleMapsService.clearMarkerIcon();
  }
}
