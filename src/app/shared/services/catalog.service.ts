import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public products$ = this.products.asObservable();

  constructor() {
    this.load();
  }


  private load(): void {
    const products = [
      new Product({id: 1, name: 'Kaffee', information: 'infos', virtualWater: 120}),
      new Product({id: 2, name: 'Kaffee', information: 'infos', virtualWater: 120}),
      new Product({id: 3, name: 'Kaffee', information: 'infos', virtualWater: 120}),
      new Product({id: 4, name: 'Kaffee', information: 'infos', virtualWater: 120}),
      new Product({id: 5, name: 'Kaffee', information: 'infos', virtualWater: 120}),
      new Product({id: 6, name: 'Kaffee', information: 'infos', virtualWater: 120}),
    ];
    this.products.next(products);
  }
}
