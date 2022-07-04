import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public modalController: ModalController) { }



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

}

