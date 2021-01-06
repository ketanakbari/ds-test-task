import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppService} from '../../services/app.service';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  providers: [
    AppService
  ]
})
export class LayoutModule {
}
