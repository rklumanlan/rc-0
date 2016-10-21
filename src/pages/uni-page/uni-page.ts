import {Component,ViewChild} from '@angular/core';
import {NavController, NavParams, Content} from 'ionic-angular';

import {GeolocationService} from '../../providers/geolocation-service/geolocation-service';
import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';
import {TranslateService} from 'ng2-translate/ng2-translate';

import {UniDetailPage} from '../uni-detail-page/uni-detail-page';

@Component({
  selector: 'uni-page',
  templateUrl: 'uni-page.html'
})
export class UniPage {

  @ViewChild(Content) content: Content;

  public details: any;
  public page: string;
  public params: any;
  public items: any;
  public res: any;
  public count: any;
  public disable: any;
  public title_header: string;
  public pl_type_items: any;
  public cui_items: any;
  public sort_items: any;
  public enterCTR: number;
  public results: any;
  public sort: string;

  public placeType: any;
  public cuisine: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocationService: GeolocationService, public connectivity: ConnectivityService, public translate: TranslateService) {
    this.details = navParams.get('geoloc');
    this.page = navParams.get('page');

    this.params = {};

    // this.placeType = 'restaurant';
    // this.sort = 'Distance';
    // this.cuisine = 'food';

    this.items = [];
    this.res = null;
    this.count = null;

    this.disable = null;

    if(this.page =='resto'){
      this.title_header = "Restaurants";
      this.pl_type_items = [
        { value: "restaurant", text: 'Restaurants', checked: true},
        { value: "cafe", text: 'Cafés', checked: false},
      ];

      this.cui_items = [
        { value: "food", text: 'Any Cuisine', checked: true},
        { value: "American", text: 'American', checked: false},
        { value: "Chinese", text: 'Chinese', checked: false},
        { value: "Filipino", text: 'Filipino', checked: false},
        { value: "Indian", text: 'Indian', checked: false},
        { value: "Italian", text: 'Italian', checked: false},
        { value: "Japanese", text: 'Japanese', checked: false},
        { value: "Lebanese", text: 'Lebanese', checked: false},
        { value: "Mexican", text: 'Mexican', checked: false},
        { value: "Spanish", text: 'Spanish', checked: false},
        { value: "Thai", text: 'Thai', checked: false},
        { value: "Vietnamese", text: 'Vietnamese', checked: false},
      ];
    }
    else if(this.page =='hotels'){
      this.title_header = "Hotels";
      this.pl_type_items = [{ value: "lodging", text: 'Hotels', checked: true}];
    }
    else if(this.page =='malls'){
      this.title_header = "Malls";
      this.pl_type_items = [
        { value: "shopping_mall", text: 'Malls', checked: true},
        { value: "department_store", text: 'Department Stores', checked: false},
        { value: "clothing_store", text: 'Clothing Stores', checked: false},
        { value: "shoe_store", text: 'Shoe Stores', checked: false},
      ];
    }
    else if(this.page =='supermarkets'){
      this.title_header = "Supermarkets";
      this.pl_type_items = [{ value: "grocery_or_supermarket", text: 'Supermarkets', checked: true}];
    }
    else if(this.page =='salons'){
      this.title_header = "Beauty Salons";
      this.pl_type_items = [{ value: "beauty_salon", text: 'Beauty Salons', checked: true}];
    }
    else if(this.page =='police'){
      this.title_header = "Police Stations";
      this.pl_type_items = [{ value: "police", text: 'Police Stations', checked: true}];
    }
    else if(this.page =='hospitals'){
      this.title_header = "Hospitals";
      this.pl_type_items = [{ value: "hospital", text: 'Hospitals', checked: true}];
    }

    this.sort_items = [
      { value: "Distance", text: 'Distance', checked: true},
      { value: "Alphabetically", text: 'Alphabetically', checked: false},
      { value: "Rating", text: 'Rating', checked: false},
    ];

    this.enterCTR = 1;

    this.results = [];

  }

  ionViewWillEnter(){
    var me = this;
    me.params.geoloc = this.details;
    this.sort = 'Distance';


    if(me.page =='resto'){
      me.params.placeType = 'restaurant';
      me.params.cuisine = 'food';
    }
    else if(me.page =='hotels'){
      me.params.placeType = 'lodging';
      me.params.cuisine = '';
    }
    else if(me.page =='malls'){
      me.params.placeType = 'shopping_mall';
      me.params.cuisine = '';
    }
    else if(me.page =='supermarkets'){
      me.params.placeType = 'grocery_or_supermarket';
      me.params.cuisine = '';
    }
    else if(me.page =='salons'){
      me.params.placeType = 'beauty_salon';
      me.params.cuisine = '';
    }
    else if(me.page =='police'){
      me.params.placeType = 'police';
      me.params.cuisine = '';
    }
    else if(me.page =='hospitals'){
      me.params.placeType = 'hospital';
      me.params.cuisine = '';
    }




    if (me.enterCTR === 1){
      me.geolocationService.setPlaces(me.params).then(function (res) {
        me.items = [];
        // setTimeout(function() {
          console.log("1bb");
          console.log(res);
          me.res = res;
          // me.items = [];
          console.log(res[0]);
          for (me.count = 0; me.count < 20; me.count++) {
            console.log(res[me.count]!==undefined);

              console.log("2bb");
              console.log(res[me.count]);
            if (res[me.count]!==undefined) {
              me.items.push(res[me.count]);
              console.log("push");
            }

          }
            console.log(me.items);
          me.setRating();
          // me.sortItems(me.sort);
          if (document.getElementById('loading')!==null) {
            document.getElementById('loading').style.display="none";
          }
        // }, 1000);
      });
    }

  }

  displayDetails(ctr){

    var item = ctr;

    console.log(item);
    var me = this;
    if(me.connectivity.isOnline()){
      me.geolocationService.setPlaceDetails('map',item.place_id).then(function (res) {
        console.log('inner');
        me.results = res[0];
        me.results.rating = item.rating;


        console.log(me.results);
        me.navCtrl.push(UniDetailPage, {item_select:me.results,page:me.page});

      });
    }
    else {
      me.geolocationService.netErrMsg();
    }

  }


  ionViewDidLeave(){
    this.enterCTR += 1;
    console.log('didleave'+this.enterCTR);


  }

  doInfinite(infiniteScroll) {
    var me = this;
    console.log('Begin async operation');
    console.log(me.res);
    console.log( me.count);

    setTimeout(() => {
      var i;
      for (i = me.count; i < me.res.length; i++) {
        me.items.push(me.res[i]);
        console.log(i);
      }
      me.setRating();

      me.count = i;



      console.log('Async operation has ended');
      infiniteScroll.complete();
      if (me.res.length >= me.count && me.res.length <= me.count) {
        infiniteScroll.enable(false);
      }
    }, 2000);

  }

  updatePlaceType(placetype){
    document.getElementById('loading').style.display="inline";
    var me = this;
    me.params.geoloc = this.details;
    me.params.placeType = placetype;
    if (placetype == 'cafe') {
      me.params.cuisine = '';
      me.disable = true;
    }
    else {
      me.params.cuisine = me.cuisine;
      me.disable = false;
    }
    me.geolocationService.setPlaces(me.params).then(function (res) {
      me.items = [];
      setTimeout(function() {
        // me.items = res;
        // me.setRating();
        // me.sortItems(me.sort);
        console.log(res);
        me.res = res;
        me.items = [];
        for (me.count = 0; me.count < 20; me.count++) {
          if (res[me.count]!==undefined) {
            me.items.push(res[me.count]);
          }

        }
          console.log(me.items);
        me.setRating();
        me.sortItems(me.sort);
        document.getElementById('loading').style.display="none";
      }, 2000);
    });
  }

  updateCuisine(cuisine){
    console.log('up cu');
    document.getElementById('loading').style.display="inline";
    var me = this;
    me.params.geoloc = this.details;
    me.params.placeType = 'restaurant';
    me.params.cuisine = cuisine;
    console.log(me.params);
    me.geolocationService.setPlaces(me.params).then(function (res) {
      me.items = [];
      setTimeout(function() {
        // me.items = res;
        // console.log(me.items);
        // me.setRating();
        // me.sortItems(me.sort);
        console.log(res);
        me.res = res;
        me.items = [];
        for (me.count = 0; me.count < 20; me.count++) {
          if (res[me.count]!==undefined) {
            me.items.push(res[me.count]);
          }

        }
          console.log(me.items);
        me.setRating();
        me.sortItems(me.sort);
        document.getElementById('loading').style.display="none";
      }, 2000);
    });
  }

  updateSort(evt){
    console.log('enter '+evt);
    var me = this;
    me.setRating();
    me.sortItems(evt);
  }

  sortItems(sortVal){
    console.log(sortVal);
    var me = this;
    if (sortVal == 'Alphabetically') {
      me.items.sort(function(a,b) {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      });
    }
    else if (sortVal== 'Rating') {
      me.items.sort(function(a,b) {
        a = a.rating;
        b = b.rating;
        return a < b ? 1 : (a > b ? -1 : 0);
      });
      console.log(me.items);
    }
    else {
      me.items.sort(function(a,b) {
        a = a.distance;
        b = b.distance;
        return a < b ? -1 : (a > b ? 1 : 0);
      });
      console.log(me.items);
    }
    this.content.scrollToTop();
  }

  setRating(){
    var me = this;
    console.log('setRating');
    setTimeout(function() {

      var x: any = document.getElementsByClassName("itm_rating");
      var y: any = document.getElementsByClassName("itm_hours");
      var rating,half,remaining;

      for (var a = 0; a < me.items.length; a++) {
        if (x[a]!==undefined||y[a]!==undefined) {
          //rating number
          rating = Math.floor(me.items[a].rating);
          //get decimal num if there is
          half = (me.items[a].rating % 1).toFixed(1);
          //reamianing stars to append
          remaining = Math.floor(5 - me.items[a].itm_rating);
          //appending store open
          if (me.items[a].opening_hours!==undefined) {
            if (me.items[a].opening_hours.open_now!==undefined) {
              console.log(me.items[a].opening_hours.open_now);
              console.log(y[a]);
              if (y[a].innerHTML=="") {
                if (me.items[a].opening_hours.open_now === true) {
                  y[a].insertAdjacentHTML( 'beforeend', '<span class="open">Open <ion-icon color="secondary" name="time" role="img" class="icon-ios icon-ios-secondary ion-ios-time-outline" ios="ios-time-outline" md="md-time" aria-label="ios-time"></ion-icon></span>');
                }
                else {
                  y[a].insertAdjacentHTML( 'beforeend', '<span class="close">Close <ion-icon color="danger" name="time" role="img" class="icon-ios icon-ios-danger ion-ios-time-outline" ios="ios-time-outline" md="md-time" aria-label="ios-time"></ion-icon></span>');
                }
              }


            }
          }

          if (me.items[a].rating!=0) {
            var ctr = 0;
            if (x[a].innerHTML=="") {
              for (var b = 1; b <= rating; b++) {
                x[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star" role="img" class="ion-ios-star" aria-label="ios-star"></ion-icon>');
                ctr=ctr+1;
              }
              //int
              if (me.items[a].rating % 1 === 0) {
                if (remaining !== 0 && ctr<=5) {
                  for (var b = 1; b <= (5-ctr); b++) {
                    x[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-outline" role="img" class="ion-ios-star-outline" aria-label="ios-star-outline"></ion-icon>');
                  }
                  ctr=ctr+1;
                }
              }
              //float
              else if (me.items[a].rating % 1 !== 0) {
                if (half !== 0.0 && (me.items[a].rating %1 !== 0)) {
                  x[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-half" role="img" class="ion-ios-star-half" aria-label="ios-star-half"></ion-icon>');
                  ctr=ctr+1;
                }
                if (remaining !== 0 && ctr<=5) {
                  for (var b = 1; b <= (5-ctr); b++) {
                    x[a].insertAdjacentHTML( 'beforeend', '<ion-icon primary name="star-outline" role="img" class="ion-ios-star-outline" aria-label="ios-star-outline"></ion-icon>');
                    ctr=ctr+1;
                  }
                }
              }
              console.log(ctr+" ctr");
            }
          }
        }
      }
    }, 500);
  }
}
