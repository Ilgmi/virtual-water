import {Component, OnInit} from '@angular/core';
import {VirtualWaterCalculatorService} from './services/virtual-water-calculator.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SelectProductModalComponent} from './modals/select-product-modal/select-product-modal.component';
import {Product} from '../../shared/models/product';
import {ShowProductInformationModalComponent} from './modals/show-product-information-modal/show-product-information-modal.component';
import {faInfoCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  infoCircle = faInfoCircle;
  trashAlt = faTrashAlt;

  constructor(public virtualWaterCalculator: VirtualWaterCalculatorService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  async addProduct(): Promise<void> {
    this.modalService.open(SelectProductModalComponent, { scrollable: true }).result.then(async (result) => {
      if (result) {
        await this.virtualWaterCalculator.addProducts(result);
      }
    });
  }

  async showInformation(product: Product): Promise<void> {
    const modalRef = this.modalService.open(ShowProductInformationModalComponent, { scrollable: true });
    modalRef.componentInstance.product = product;
  }

  async reset(): Promise<void> {
    await this.virtualWaterCalculator.reset();
  }

  async remove(p: Product): Promise<void> {
    await this.virtualWaterCalculator.removeProduct(p);
  }
}
