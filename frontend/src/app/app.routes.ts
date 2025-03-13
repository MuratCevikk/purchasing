import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';


export const routes: Routes = [


  {path:"login",loadComponent:()=>import('./login/login.component').then(m=>m.LoginComponent)},


  {
    path: '',
    component: LayoutComponent, canActivate: [ () =>inject(AuthService).isAuthenticated() ],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Boş path olduğunda home'a yönlendir
      { path: 'home', loadComponent: ()=>   import('./layout/home/home.component').then(m=>m.HomeComponent) },
      { path: 'about', loadComponent: ()=>   import('./layout/about/about.component').then(m=>m.AboutComponent) },
      { path: 'productDetail/:params', loadComponent: ()=>   import('./layout/product-detail/product-detail.component').then(m=>m.ProductDetailComponent) },

    ]

  }






];
