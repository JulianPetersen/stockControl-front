import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Products } from 'src/app/models/products';
import { GlobalService } from 'src/app/services/global.service';
import { ProductosService } from 'src/app/services/productos.service';
import { AgregarProductoModalComponent } from '../agregar-producto-modal/agregar-producto-modal.component';
import { ProducteditComponent } from '../productedit/productedit.component';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss'],
})
export class SelectProductComponent implements OnInit {
  constructor(
    public global: GlobalService,
    public products: ProductosService,
    public modalController: ModalController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  listPorducts: Products[];

  getProducts() {
    this.products.getProducts().subscribe((res: Products[]) => {
      this.listPorducts = res;
      
    });
  }

  async deleteproduct(id) {
    const alert = await this.alertController.create({
      header: '¿Está seguro que desea eliminar este producto?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.products.deleteProduct(id).subscribe(
              (res) => {
                console.log(res);
              },
              (err) => {
                console.log(err.message);
              }
            );
            this.getProducts();
          },
        },
      ],
    });

    await alert.present();
  }

  async editModal(_id, nombre, categoria, monto, stock, imgUrl) {
    const modal = await this.modalController.create({
      component: ProducteditComponent,
      componentProps: {
        id: _id,
        nombre: nombre,
        categoria: categoria,
        monto: monto,
        stock: stock,
        imgUrl: imgUrl,
      },
    });
    modal.onDidDismiss().then((data: any) => {
      this.getProducts();
    });
    return await modal.present();
  }


  ProductSelected(prod){
    this.modalController.dismiss({
      prod
    })
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
