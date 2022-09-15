import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { CategoriesProductService } from 'src/app/services/categories-product.service';
import { CategoriesProduct } from 'src/app/models/categories-product';
import { AlertController, DomController, ModalController } from '@ionic/angular';
import { AddCategoryProductComponent } from '../add-category-product/add-category-product.component';
import { PostProduct, Products } from 'src/app/models/products';
import { ProductosService } from 'src/app/services/productos.service';



@Component({
  selector: 'app-agregar-producto-modal',
  templateUrl: './agregar-producto-modal.component.html',
  styleUrls: ['./agregar-producto-modal.component.scss'],
})
export class AgregarProductoModalComponent implements OnInit {

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
    userId:localStorage.getItem('userId')
  }
  categorieSelected:string="sin categoria";

  newProduct:PostProduct={
    name:"",
    category:this.categorieSelected,
    price:0,
    stock:0,
    userId:localStorage.getItem('userId')
    
  }


  addProduct(){
    if(this.verificarData()){
      this.productService.postProduct(this.newProduct.name,this.newProduct.category,this.newProduct.price, this.newProduct.stock,this.newProduct.image,this.newProduct.userId)
      .subscribe(res => {
        
        this.modalController.dismiss();
      })
    }
    
}

  verificarData(){
    if(this.newProduct.name == ""){
      this.global.presentAlert('Faltan Datos', "No puede dejar el campo Nombre vacio")
      return false
    }else if(this.newProduct.price == 0){
      this.global.presentAlert('Faltan Datos', "No puede dejar el campo Precio en 0")
      return false
    }else if(this.newProduct.stock == 0){
      this.global.presentAlert('Faltan Datos', "No puede dejar el campo Stock en 0")
      return false
  }else if(this.newProduct.image == undefined){
    this.global.presentAlert('Faltan Datos', "No ha seleccionado una imagen para su producto")
    return false
  }
  return true

}
  cerrarModal(){
    this.global.dismissModal();
  }


  getCategoriesProduct(){
    this.categoriesProduct.getCategories(localStorage.getItem('userId'))
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
      this.newProduct.category = data.data.categorie
      
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

}