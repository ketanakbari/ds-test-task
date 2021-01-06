import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppService} from '../../services/app.service';
import {ChartsModule} from 'ng2-charts';
import {UsersComponent} from './users/users.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatTableExporterModule} from 'mat-table-exporter';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ChartsModule,
    MatButtonModule,
    MatTableModule,
    MatTableExporterModule
  ],
  providers: [
    AppService
  ]
})
export class LayoutModule {
}
