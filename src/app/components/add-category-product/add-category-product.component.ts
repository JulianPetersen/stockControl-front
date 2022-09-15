import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriesProduct } from 'src/app/models/categories-product';
import { CategoriesProductService } from 'src/app/services/categories-product.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-category-product',
  templateUrl: './add-category-product.component.html',
  styleUrls: ['./add-category-product.component.scss'],
})
export class AddCategoryProductComponent implements OnInit {

  constructor(public global:GlobalService, public category:CategoriesProductService,public modalController:ModalController) { }


  categories:CategoriesProduct[]=[];
	newCategorie:CategoriesProduct = {
    name:"",
    userId:localStorage.getItem('userId')
  }

  categorieSelect:string;
  categorieSelectId:string;
  



  ngOnInit() {
    this.getCategories()
    
  }


  cerrarModal(){
    this.modalController.dismiss()
  }

  createNewCategory(){
    this.category.createCategory(this.newCategorie)
      .subscribe(res => {
        
        this.getCategories();
        this.newCategorie.name =""
      })
  }

  getCategories(){
    this.category.getCategories(localStorage.getItem('userId'))
      .subscribe((res:CategoriesProduct[]) => {
        this.categories = res;
      })
  }


  categorieSelected(){
    let categorypassed = this.categorieSelect 
    this.modalController.dismiss({categorie:categorypassed})
  }

 
}
