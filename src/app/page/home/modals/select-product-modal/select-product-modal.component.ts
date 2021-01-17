import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../../shared/models/product';
import {CatalogService} from '../../../../shared/services/catalog.service';
import {BehaviorSubject} from 'rxjs';

interface ISelectableProduct {
  selected: boolean;
  product: Product;
}

@Component({
  selector: 'app-select-product-modal',
  templateUrl: './select-product-modal.component.html',
  styleUrls: ['./select-product-modal.component.scss']
})
export class SelectProductModalComponent implements OnInit {

  private selectableProducts: BehaviorSubject<ISelectableProduct[]> = new BehaviorSubject<ISelectableProduct[]>([]);
  public selectableProducts$ = this.selectableProducts.asObservable();

  constructor(public activeModal: NgbActiveModal, private catalogService: CatalogService) {
  }

  ngOnInit(): void {
    this.catalogService.products$.subscribe(x => {
      const selectable = x.map<ISelectableProduct>(p => {
        const t: ISelectableProduct = {selected: false, product: p};
        return t;
      });
      this.selectableProducts.next(selectable);
    });
  }

  select(sp: ISelectableProduct): void {
    sp.selected = !sp.selected;
  }

  close(): void {
    const selected: Product[] = [];
    this.selectableProducts.getValue().forEach(x => {
      if (x.selected) {
        selected.push(x.product);
      }
    });
    this.activeModal.close(selected);
  }
}
