import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {VirtualWaterCalculatorService} from './services/virtual-water-calculator.service';
import { SelectProductModalComponent } from './modals/select-product-modal/select-product-modal.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [HomeComponent, SelectProductModalComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModalModule
  ],
  providers: [
    VirtualWaterCalculatorService
  ]
})
export class HomeModule { }
