import { effect, Injectable, signal, WritableSignal } from '@angular/core';

interface Product {
  id:number,
  img: string;
  name: string;
  adet: number;
}

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  prodList: WritableSignal<Product[]> = signal<Product[]>([]);
  constructor() {
    this.loadFromLocalStorage();
  }


  addProduct(id: number, img: string, name: string, adet: number) {
    this.prodList.update(oldResult => {
      const updatedList = [...oldResult, { id, img, name, adet }];
      this.saveToLocalStorage(updatedList);
      return updatedList;
    });
  }

  private saveToLocalStorage(products: Product[]) {
    localStorage.setItem('basket', JSON.stringify(products));

  }

  private loadFromLocalStorage() {
    const storedData = localStorage.getItem('basket');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.prodList.set(parsedData);
      
    }
  }


}
