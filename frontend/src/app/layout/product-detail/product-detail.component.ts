import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  //styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
id: number | null = null
deger:string=""
images:Array<any>=[];
description:string=""
mainImg:string=""



constructor(private activatedRoute:ActivatedRoute, private proList:BasketService, private productDetail:ProductService){

this.activatedRoute.params.subscribe((res)=>{

  this.productDetail.productDetail(res['params'], (data) => {
    this.deger=data.title
    this.images=data.images
    this.description=data.description
    this.mainImg=data.images[0]
    this.id=data.id
  })

})


}


changeImg(img:any){
  this.mainImg=img
}
addProductToBasket(){
  if (this.id !== null) {
    this.proList.addProduct(this.id, this.mainImg , this.deger, 1);
  } else {
    console.error('Product ID is null');
  }

}







}
