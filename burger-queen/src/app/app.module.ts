import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BidiModule} from '@angular/cdk/bidi';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';


//componentes
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { HomeAdminComponent } from './componentes/homeAdmin/home-admin/home-admin.component';
import { ModalNewUsersComponent } from './componentes/homeAdmin/modal-new-users/modal-new-users.component';
import { HomeAdminProductsComponent } from './componentes/homeAdmin/home-admin-products/home-admin-products.component';
import { HomeAdminUsersComponent } from './componentes/homeAdmin/home-admin-users/home-admin-users.component';
import { ModalNewProductsComponent } from './componentes/homeAdmin/modal-new-products/modal-new-products.component';
import { HomeWaiterComponent } from './componentes/homeWaiter/home-waiter/home-waiter.component';
import { BreakfastComponent } from './componentes/homeWaiter/breakfast/breakfast.component';
import { LunchComponent } from './componentes/homeWaiter/lunch/lunch.component';
import { CartComponent } from './componentes/homeWaiter/cart/cart.component';
import { OrdersComponent } from './componentes/homeWaiter/orders/orders.component';
import { OrdersDeliveredComponent } from './componentes/homeWaiter/orders-delivered/orders-delivered.component';
import { OrdersDeliveringComponent } from './componentes/homeWaiter/orders-delivering/orders-delivering.component';
import { OrdersDeliveringChefComponent } from './componentes/homeChef/orders-delivering-chef/orders-delivering-chef.component';
import { HomeChefComponent } from './componentes/homeChef/home-chef/home-chef.component';
import { OrdersPendingComponent } from './componentes/homeChef/orders-pending/orders-pending.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HomeAdminComponent,
    ModalNewUsersComponent,
    HomeAdminProductsComponent,
    HomeAdminUsersComponent,
    ModalNewProductsComponent,
    HomeWaiterComponent,
    BreakfastComponent,
    LunchComponent,
    CartComponent,
    OrdersComponent,
    OrdersPendingComponent,
    OrdersDeliveredComponent,
    OrdersDeliveringComponent,
    OrdersDeliveringChefComponent,
    HomeChefComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ToastrModule.forRoot(),
    MatCardModule,
    FlexLayoutModule,
    MatSidenavModule,
    BidiModule,
    MatBadgeModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
