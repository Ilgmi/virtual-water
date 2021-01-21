import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../../../shared/models/product';
import {CatalogService} from '../../../shared/services/catalog.service';

@Injectable()
export class VirtualWaterCalculatorService {


  private products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public products$ = this.products.asObservable();

  private virtualWater: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public virtualWater$ = this.virtualWater.asObservable();

  constructor(private catalogService: CatalogService) {
    this.load();
    this.products$.subscribe(x => {
      this.calcVirtualWater();
      this.save();
    });
  }


  public async addProduct(product: Product): Promise<void> {
    this.products.next([...this.products.getValue(), product]);
    // this.calcVirtualWater();
  }

  public async addProducts(products: Product[]): Promise<void> {
    this.products.next([...this.products.getValue(), ...products]);
    // this.calcVirtualWater();
  }

  public async removeProduct(product: Product): Promise<void> {
    const p = this.products.getValue();
    const index = p.indexOf(product);
    if (index >= 0) {
      p.splice(index, 1);
      this.products.next(p);
      // this.calcVirtualWater();
    }
  }

  private calcVirtualWater(): void {
    let sum = 0;
    this.products.getValue().forEach(x => sum += x.virtualWater);
    this.virtualWater.next(sum);
  }

  async reset(): Promise<void> {
    this.products.next([]);
  }

  private save(): void{
    localStorage.setItem('selected-products', this.products.getValue().map(x => x.id).join(','));
  }

  private load(): void {
    const productIds = localStorage.getItem('selected-products');
    if (productIds) {
      const products: Product[] = [];
      productIds.split(',').map(x => Number(x)).forEach(x => products.push(this.catalogService.getProduct(x)));
      this.addProducts(products).then();
    }

  }
}
