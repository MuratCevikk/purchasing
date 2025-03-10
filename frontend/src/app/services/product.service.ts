import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpProductsClient: HttpClient) {}

  getAllProducts(sortby: string , order: string , callback: (res: any) => void): void {
    const params = new HttpParams()
      .set('sortBy', sortby)
      .set('order', order);

    this.httpProductsClient.get(`${environment.baseUrl}/products`, { params }).subscribe({
      next: (data) => {
        callback(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
