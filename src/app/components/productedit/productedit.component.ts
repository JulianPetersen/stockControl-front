import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AlertController, ModalController } from '@ionic/angular';
import { CategoriesProduct } from 'src/app/models/categories-product';
import { PostProduct } from 'src/app/models/products';
import { CategoriesProductService } from 'src/app/services/categories-product.service';
import { GlobalService } from 'src/app/services/global.service';
import { ProductosService } from 'src/app/services/productos.service';
import { AddCategoryProductComponent } from '../add-category-product/add-category-product.component';

@Component({
  selector: 'app-productedit',
  templateUrl: './productedit.component.html',
  styleUrls: ['./productedit.component.scss'],
})
export class ProducteditComponent implements OnInit {
  constructor(public global:GlobalService, 
              public categoriesProduct:CategoriesProductService,
              public alert:AlertController,
              public modalController:ModalController,
              public productService:ProductosService) { }

  ngOnInit() {
    this.getCategoriesProduct();
   
  }

  file:File;
  imagenSelected:any
  categoryProduct:CategoriesProduct[] = [];
  newCategory:CategoriesProduct = {
    name:'',
  }
  categorieSelected:string="sin categoria";

  @Input() nombre
  @Input() categoria
  @Input() monto
  @Input() stock
  @Input() id
  @Input() imgUrl
  
  newProduct:PostProduct={
    name:"",
    category:this.categorieSelected,
    price:0,
    stock:0,
  }

  cerrarModal(){
    this.global.dismissModal();
  }

  getCategoriesProduct(){
    this.categoriesProduct.getCategories()
      .subscribe( (res:CategoriesProduct[]) => {
     
         this.categoryProduct = res;
      })
  }

  async agregarCategorie() {
    const modal = await this.modalController.create({
      component: AddCategoryProductComponent,
      cssClass: "customModalCat",

    });
    modal.onDidDismiss().then((data:any) =>{
      this.categorieSelected=data.data.categorie
      this.categoria = data.data.categorie
      
      
    })
    return await modal.present();

   
  }
  //#region Camera y tratamiento de imagen

  //saco foto con la camara
  async selectImage(){
    const image = await Camera.getPhoto({
      quality:90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt, 
      allowEditing:true
      
    })
    .then  (async (imageData) => {
      this.readAsBase64(imageData);
    }, (err) => {
      console.log('error: ', err)
    })
  }

 //transformo la foto que saque con la camara a base64
 private async readAsBase64(photo: Photo) {
  // Fetch the photo, read as a blob, then convert to base64 format
  const response = await fetch(photo.webPath!);
  const blob = await response.blob();
  this.file = this.blobToFile(blob,'Foto')
  this.obtenerImagen()
 
}

//transformo la foto a tipo File, para poder enviarla al servidor.
public blobToFile(theBlob, fileName){       
  return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
}


obtenerImagen(){
  let archivo = this.file;
  this.newProduct.image = this.file
  let reader = new FileReader;

  reader.readAsDataURL(archivo);
  reader.onloadend = () => {
    this.imagenSelected = reader.result
  }
}


  //#endregion


  editProduct(){

    let product = {
      name: this.nombre,
      category: this.categoria,
      price: this.monto,
      stock:this.stock

    }
    this.productService.editProduct(this.id,product)
      .subscribe(res => {
        console.log(res)
      },
      err=> {
        console.log(err)
      } )

      this.modalController.dismiss();
  }
}
