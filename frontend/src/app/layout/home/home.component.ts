import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // styleUrl değil styleUrls olmalı
})
export class HomeComponent implements OnInit {
  products: Array<any> = [];
  skeletonItems = Array.from({ length: 10 }, (_, index) => index + 1);

  sortby: string = "description";
  order: string = "asc";

  constructor(private productsService: ProductService, private proList : BasketService  , private router: Router) {}

  loadProducts(): void {
    this.productsService.getAllProducts(this.sortby, this.order, (data) => {
      this.products = data["products"];
    });
  }


  goProductDetail(productId: number) {
   this.router.navigateByUrl(`/productDetail/${productId}`)
  }

  addProductToBasket(  id:number,img:string,title:string, qua:number ){
    console.log("asdsadad"+id , img ,  title, qua)
    this.proList.addProduct(id , img ,  title, qua)

  }

  ngOnInit(): void {
    this.loadProducts(); // Doğru çağrım
  }

  artan(): void {
    this.order = "asc";
    this.loadProducts();
  }

  azalan(): void {
    this.order = "desc";
    this.loadProducts();
  }

  byTitle(): void {
    this.sortby = "title";
    this.loadProducts();
  }

  byDesc(): void {
    this.sortby = "description";
    this.loadProducts();
  }


}
