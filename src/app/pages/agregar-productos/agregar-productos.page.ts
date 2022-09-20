import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarProductoModalComponent } from 'src/app/components/agregar-producto-modal/agregar-producto-modal.component';
import { ProducteditComponent } from 'src/app/components/productedit/productedit.component';
import { Products } from 'src/app/models/products';
import { GlobalService } from 'src/app/services/global.service';
import { ProductosService } from 'src/app/services/productos.service';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.page.html',
  styleUrls: ['./agregar-productos.page.scss'],
})
export class AgregarProductosPage implements OnInit {
  
  constructor(public global:GlobalService, 
              public products:ProductosService, 
              public modalController:ModalController,
              public alertController:AlertController) { }

  ngOnInit() {
    this.getProducts();
 
  }

  listPorducts:Products[];
  productName:string;


  getProducts(){
    this.products.getProducts(localStorage.getItem('userId'))
      .subscribe((res:Products[]) => {
        this.listPorducts = res
        
      })
  }

  async deleteproduct(id){
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
            this.products.deleteProduct(id)
            .subscribe(res => {
              console.log(res);
            },
            err => {
              console.log(err.message)
            })
            this.getProducts();
           }
        }
      ]
    });

    await alert.present();
  }

  

  async editModal(_id,nombre, categoria, monto, stock, imgUrl){
    const modal = await this.modalController.create({
      component: ProducteditComponent,
      componentProps:{
          id:_id,
          nombre:nombre,
          categoria:categoria,
          monto:monto,
          stock:stock,
          imgUrl:imgUrl
      }

    });
    modal.onDidDismiss().then((data:any) =>{
      this.getProducts();
    })
    return await modal.present();
  }

  async presentModal(){
    //this.global.presentModal(AgregarProductoModalComponent,'','')

    const modal = await this.modalController.create({
      component: AgregarProductoModalComponent,
    });
    modal.onDidDismiss().then((data:any) =>{
      this.getProducts();
    })
    return await modal.present();
  }


  buscarProductoPorNombre(){
    if(this.productName == ""){
      this.getProducts();
    }else{
      this.products.getProductByName(localStorage.getItem('userId'), this.productName)
      .subscribe((res:Products[]) => {
        console.log(res)
        this.listPorducts = res
      })
    }
    

  }
}
