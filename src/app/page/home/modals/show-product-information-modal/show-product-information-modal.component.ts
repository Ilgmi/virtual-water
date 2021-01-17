import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../../shared/models/product';

@Component({
  selector: 'app-show-product-information-modal',
  templateUrl: './show-product-information-modal.component.html',
  styleUrls: ['./show-product-information-modal.component.scss']
})
export class ShowProductInformationModalComponent implements OnInit {

  @Input() product: Product;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
