import {Component} from '@angular/core';
import {DataService} from '../../../providers/data-service/data-service';
import {JeepDetailsPage} from '../../jeepney/jeep-routes/jeep.details';

@Component({
  templateUrl: 'jeep.view.html'
})

export class JeepRoutesPage {

  public JeepDetailsPage: any = JeepDetailsPage;
  public acjeeps: any;
  public cjeeps: any;
  public divider: any;

  constructor(public dataService: DataService){
    this.acjeeps = [];
    this.cjeeps = [];
    this.divider = ['Angeles','Clark'];

    this.dataService.getAllData('Angeles').then((data) => {
      console.log("getAllData from jeep table");
      console.log(data);
      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          this.acjeeps.push({name: data.rows.item(i).name, color: data.rows.item(i).color, image:data.rows.item(i).image});
        }
      }

    }, (err) => {
      console.error('Unable to getAllData angeles: ', err);
    });

    this.dataService.getAllData('Clark').then((data) => {
      console.log("getAllData from jeep table");
      console.log(data);
      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          this.cjeeps.push({name: data.rows.item(i).name, color: data.rows.item(i).color, image:data.rows.item(i).image});
        }
      }

    }, (err) => {
      console.error('Unable to getAllData clark: ', err);
    });
  }


}
