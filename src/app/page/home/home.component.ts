import {Component, OnInit} from '@angular/core';
import {VirtualWaterCalculatorService} from './services/virtual-water-calculator.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SelectProductModalComponent} from './modals/select-product-modal/select-product-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public virtualWaterCalculator: VirtualWaterCalculatorService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  async addProduct(): Promise<void> {
    this.modalService.open(SelectProductModalComponent).result.then(async (result) => {
      if (result) {
        await this.virtualWaterCalculator.addProducts(result);
      }
    });
  }
}
