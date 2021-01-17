import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../../../shared/models/product';

@Injectable()
export class VirtualWaterCalculatorService {


  private products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public products$ = this.products.asObservable();

  private virtualWater: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public virtualWater$ = this.virtualWater.asObservable();

  constructor() {
  }


  public async addProduct(product: Product): Promise<void> {
    this.products.next([...this.products.getValue(), product]);
    this.calcVirtualWater();
  }

  public async addProducts(products: Product[]): Promise<void>{
    this.products.next([...this.products.getValue(), ...products]);
    this.calcVirtualWater();
  }

  public async removeProduct(product: Product): Promise<void> {
    const p = this.products.getValue();
    const index = p.indexOf(product);
    if (index >= 0) {
      this.products.next([...p.splice(index, 1)]);
      this.calcVirtualWater();
    }
  }

  private calcVirtualWater(): void {
    let sum = 0;
    this.products.getValue().forEach(x => sum += x.virtualWater);
    console.log(sum, this.products.getValue());
    this.virtualWater.next(sum);
  }
}
