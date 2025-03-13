
import { AfterViewInit, Component, computed, effect, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent   {


  @ViewChild("basketList", {read: ElementRef}) basketList: ElementRef | undefined;

prodListArray:Array<any>=[]

  constructor( private authService: AuthService,  private proList : BasketService  ,  private router: Router) {

    this.authService.authonticatedUser(localStorage.getItem('token')).subscribe({
      next: (data) => {
       console.log(data);
      },
      error: (error) => {
       // console.log("Dee" + JSON.stringify(error));
      }
    });



effect(() => {
  this.prodListArray = this.proList.prodList();
});



  }




  showProductList() {
    if (this.basketList) {
      this.basketList.nativeElement.style.display = "block"
    }

  }

closeProductList() {
    if (this.basketList) {
      this.basketList.nativeElement.style.display = "none"
    }

  }


  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


}
