import {Component} from '@angular/core';
import {ModalController, NavController, ViewController,NavParams} from 'ionic-angular';
import {DataService} from '../../../providers/data-service/data-service';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  templateUrl: 'modal.html'
})

export class MyModal {

  public points: any;
  public searchQuery: any;
  public items: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public modalCtrl: ModalController, public navParams: NavParams, public dataService: DataService,  public translate: TranslateService){
    this.points = [];

    console.log(this.dataService.getPoints());
    this.dataService.getPoints().then((data) => {
      console.log(data.result);
      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          if (navigator.language.split('-')[0]=='ja') {
            // console.log(this.jp[0][data.rows.item(i).text]);
            // this.points.push(this.jp[0][data.rows.item(i).text]);
            translate.get(data.rows.item(i).text).subscribe((res: string) => {
                this.points.push(res);
            });
          }
          else {
            this.points.push(data.rows.item(i).text);
          }
        }
      }
    }, (error) => {
      console.log(error);
    })

    this.searchQuery = '';
    this.initializeItems();
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
     let val = searchbar.target.value;

    // if the value is an empty string don't filter the items
    // if (q.trim() == '') {
    //   return;
    // }
    //
    // this.items = this.items.filter((v) => {
    //   console.log(v);
    //   if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
    //     return true;
    //   }
    //   return false;
    // })

    // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
  }

  initializeItems() {
    this.items = this.points;
  }

  close() {
    this.viewCtrl.dismiss();
  }

  validateItem(ctr){
    let data = { 'point': ctr };
    this.viewCtrl.dismiss(data);
  }
}
