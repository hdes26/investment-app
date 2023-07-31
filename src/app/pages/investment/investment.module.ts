import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { InvestmentComponent } from './investment.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InvestmentComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class InvestmentModule { }
