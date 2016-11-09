import {Component} from '@angular/core';
import {Modal, NavController, AlertController, ModalController} from 'ionic-angular';


import {MyModal} from '../../jeepney/find-routes/modal';
import {RoutesMapsPage} from '../../jeepney/find-routes/routes.map';

import {TranslateService} from 'ng2-translate/ng2-translate';
import {ConnectivityService} from '../../../providers/connectivity-service/connectivity-service';
import {GoogleMapsService} from '../../../providers/google-maps-service/google-maps-service';

@Component({
  templateUrl: 'routes.view.html'
})

export class FindRoutesPage {

  public from: string;
  public to: string;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController, public translate: TranslateService, public connectivity: ConnectivityService, public googleMapsService: GoogleMapsService){
    this.from = 'Choose starting point';
    this.to = 'Choose destination';
  }

  showModal(ctr){

    var me = this;
    var trans = [{
      "アンヘレスシティホール":"Angeles City Hall",
      "Angeles Medical Center Inc.":"Angeles Medical Center Inc.",
      "アンヘレスユニバーシティファウンデーション":"Angeles University Foundation",
      "AUF メディカルセンター":"Angeles University Foundation Medical Center",
      "アヌナス":"Anunas",
      "バンカル":"Bancal",
      "Carmenville":"Carmenville",
      "シティセンター":"Citi Center",
      "アンヘレスシティ大学":"City College of Angeles",
      "Cuayan":"Cuayan",
      "ダイアモンドサブディビジョン":"Diamond Subdivision",
      "Dr. Amando L. Garcia Medical Center, Inc.":"Dr. Amando L. Garcia Medical Center, Inc.",
      "フィールズアベニュー":"Fields Avenue",
      "フレンドシップ":"Friendship",
      "フレンドシッププラザ":"Friendship Plaza",
      "ホリーエンジェル大学":"Holy Angel University",
      "ホリーファミリーメディカルセンター":"Holy Family Medical Center",
      "Holy Rosary Parish Church":"Holy Rosary Parish Church",
      "イマキュレートコンセプションパリッシュ":"Immaculate Concepcion Parish",
      "Jenra Mall":"Jenra Mall",
      "ルーデスノースウェスト":"Lourdes North West",
      "メインゲートターミナル":"Main Gate Terminal",
      "マーゴット":"Margot",
      "マリソル":"Marisol",
      "マーキーモール":"Marquee Mall",
      "Nepo Mall":"Nepo Mall",
      "ラファエルラサティンメモリアルメディカルセンター":"Rafael Lazatin Memorial Medical Center",
      "リパブリックセントラルコレッジズ":"Republic Central Colleges",
      "SMシティクラーク":"SM City Clark",
      "サクレッドハートメディカルセンター":"Sacred Heart Medical Center",
      "サパンベイトー":"Sapang Bato",
      "Saver\'s Mall":"Saver\'s Mall",
      "システムズプラスカレッジファウンデーション":"Systems Plus College Foundation",
      "ザメディカルシティ - アンヘレス":"The Medical City Angeles",
      "チモグパークゲート1":"Timog Park Gate 1",
      "チモグパークゲート 2":"Timog Park Gate 2",
      "チモグパークゲート 3":"Timog Park Gate 3",
      "トランスファ":"Transfer",
      "Villa Sol":"Villa Sol",
    }];
    console.log(ctr);
    let profileModal = me.modalCtrl.create(MyModal, { ctrId: ctr });
    profileModal.onDidDismiss(data => {
      console.log(data);
      console.log(data!=undefined);
      if (data!=undefined) {
        if (ctr=='from') {
          if (navigator.language.split('-')[0]=='ja') {
            this.from = trans[0][data.point];
          }
          else {
            this.from = data.point;
          }

        }
        else if (ctr=='to') {
          if (navigator.language.split('-')[0]=='ja') {
            this.to = trans[0][data.point];
          }
          else {
            this.to = data.point;
          }
        }
      }


      // console.log(data.point);
    });
    profileModal.present();

    // var me = this;
    //
    // console.log(ctr);
    // let profileModal = me.modalCtrl.create(MyModal, { ctrId: ctr });
    // profileModal.onDidDismiss(data => {
    //   console.log(data);
    //   console.log(data!=undefined);
    //   if (data!=undefined) {
    //
    //     if (ctr=='from') {
    //       console.log("from+"+data.point);
    //       if (navigator.language.split('-')[0]=='en') {
    //         this.translate.get(data.point).subscribe((res: string) => {
    //             this.from = res;
    //         });
    //       }
    //       else {
    //         this.from = data.point;
    //       }
    //
    //     }
    //     else if (ctr=='to') {
    //       console.log("to+"+data.point);
    //       if (navigator.language.split('-')[0]=='en') {
    //         this.translate.get(data.point).subscribe((res: string) => {
    //             this.to = res;
    //         });
    //       }
    //       else {
    //         this.to = data.point;
    //       }
    //     }
    //   }
    //
    //
    //   // console.log(data.point);
    // });
    // profileModal.present();
  }
  submitForm(from,to){
    var me = this;

    var transTitle;

    this.translate.get("Alert").subscribe((res: string) => {
      transTitle = res;
    });

    if(from == 'Choose starting point' || to == 'Choose destination'){
      console.log(from+"-"+to);
      let alert = me.alertCtrl.create({
        title: transTitle,
        subTitle: 'Empty Fields! Please select starting point or destination.',
        buttons: ['OK']
      });
      alert.present();
    }
    else if (from == to) {
      let alert = me.alertCtrl.create({
        title: transTitle,
        subTitle: 'Starting point and destination must not be the',
        buttons: ['OK']
      });
      alert.present();
    }
    // else if (from == to) {
    //   me.alertBox('Alert','Starting point and destination must not be the same.');
    // }
    else if (from =="Angeles City Hall" && to == "Marquee Mall") {
      me.alertBox(to);
    }
    else if (from == "Marquee Mall"&&to =="Angeles City Hall") {
      me.alertBox(to);
    }
    else if (from =="Main Gate Terminal" && to == "SM City Clark") {
      me.alertBox(to);
    }
    else if (from == "SM City Clark"&&to =="Main Gate Terminal") {
      me.alertBox(to);
    }
    else if (from == 'Angeles University Foundation' && to== 'Angeles University Foundation Medical Center') {
      me.alertBox(to);
    }
    else if (from == 'Angeles University Foundation Medical Center' && to== 'Angeles University Foundation') {
      me.alertBox(to);
    }
    else if (from == 'Holy Angel University' && to== 'Holy Rosary Parish Church') {
      me.alertBox(to);
    }
    else if (from == 'Holy Rosary Parish Church' && to== 'Holy Angel University') {
      me.alertBox(to);
    }
    else if (from == 'Immaculate Concepcion Parish' && to== 'Systems Plus College Foundation') {
      me.alertBox(to);
    }
    else if (from== 'Systems Plus College Foundation' && to == 'Immaculate Concepcion Parish') {
      me.alertBox(to);
    }
    else if (from == 'Friendship Plaza' && to== 'Timog Park Gate 3') {
      me.alertBox(to);
    }
    else if (from== 'Timog Park Gate 3'&&to == 'Friendship Plaza') {
      me.alertBox(to);
    }
    else if (from == 'Jenra Mall' && to== 'Nepo Mall') {
      me.alertBox(to);
    }
    else if (from== 'Nepo Mall'&&to == 'Jenra Mall') {
      me.alertBox(to);
    }
    else if (from == "Diamond Subdivision"&&to =="Saver\'s Mall") {
      me.alertBox(to);
    }
    else if (from == "Saver\'s Mall"&&to =="Diamond Subdivision") {
      me.alertBox(to);
    }
    else if (from == "Timog Park Gate 1"&&to =="Carmenville") {
      me.alertBox(to);
    }
    else if (from =="Carmenville" && to == "Timog Park Gate 1") {
      me.alertBox(to);
    }
    else {


      if(me.connectivity.isOnline()){
        console.log(from+"="+to);
        this.navCtrl.push(RoutesMapsPage, { from: from, to: to });
      }
      else {
        console.log("disabling map");
        me.googleMapsService.disableMap();
        me.navCtrl.pop();
      }
    }

  }

  alertBox(to){
    var transTitle,subtitle;

    this.translate.get("Alert").subscribe((res: string) => {
      transTitle = res;
    });

    this.translate.get('You are just near to '+to+'. You don\'t need to ride a jeepney.').subscribe((res: string) => {
      subtitle = res;
    });

    var me = this;
    let alert = me.alertCtrl.create({
      title: transTitle,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }


}
