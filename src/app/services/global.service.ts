import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public modalController: ModalController,
              public alert:AlertController) { }

  URL="http://localhost:4000/api"


async presentModal(component:any, data:any, clase:string) {
    const modal = await this.modalController.create({
      component: component,
      cssClass: clase,
      componentProps:data
    });
    return await modal.present();
  }

dismissModal() {
    this.modalController.dismiss({
      'dismissed': true,
    });
  }

  async presentAlert(title:string,message:string) {
    const alert = await this.alert.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  validateFormatEmail(value: string) {
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test(value);
  };

}

