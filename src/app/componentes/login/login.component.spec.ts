import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { HomeAdminComponent } from '../homeAdmin/home-admin/home-admin.component';
import { HomeAdminProductsComponent } from '../homeAdmin/home-admin-products/home-admin-products.component';
import { HomeAdminUsersComponent } from '../homeAdmin/home-admin-users/home-admin-users.component';
import { HomeChefComponent } from '../homeChef/home-chef/home-chef.component';
import { OrdersDeliveringChefComponent } from '../homeChef/orders-delivering-chef/orders-delivering-chef.component';
import { OrdersPendingComponent } from '../homeChef/orders-pending/orders-pending.component';
import { BreakfastComponent } from '../homeWaiter/breakfast/breakfast.component';
import { HomeWaiterComponent } from '../homeWaiter/home-waiter/home-waiter.component';
import { LunchComponent } from '../homeWaiter/lunch/lunch.component';
import { OrdersComponent } from '../homeWaiter/orders/orders.component';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;
  //spy del servicio
  let loginService: jasmine.SpyObj<LoginService>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate').and.callFake(() => {
      console.log("EJECUTO este SPY")
    })
  };
  const routes = [
    {
      path: 'admin', component: HomeAdminComponent,
      children: [
        { path: 'users', component: HomeAdminUsersComponent },
        { path: 'products', component: HomeAdminProductsComponent }
      ]
    },
    {
      path: 'waiter', component: HomeWaiterComponent,
      children: [
        { path: 'breakfast', component: BreakfastComponent },
        { path: 'lunch', component: LunchComponent },
        { path: 'orders', component: OrdersComponent }
      ]
    },
    {
      path: 'chef', component: HomeChefComponent,
      children: [
        { path: 'pending', component: OrdersPendingComponent },
        { path: 'delivering', component: OrdersDeliveringChefComponent }
      ]
    },
  ]

  beforeEach(async () => {
    //spy del método que usaremos del servicio
    loginService = jasmine.createSpyObj<LoginService>('LoginService', ['postUsers']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        ToastrService,
        { provide: Router, useValue: mockRouter },
        { provide: LoginService, useValue: loginService }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('the form is valid and login to have been called', fakeAsync(() => {

    const email = component.loginForm.controls['email']
    const password = component.loginForm.controls['password']
    email.setValue('meseroprueba.hopper@systers.xyz');
    password.setValue('1234567');

    // const spyOfMethod = spyOn(loginService,'postUsers');
    // console.log("spyyyyyyyyyyyyyyyyyyyyyyyy",spyOfMethod)
    const compiled = fixture.nativeElement;
    const btnLogin = compiled.querySelector('.btn');
    // component.login();
    btnLogin.click();
  }))

  it('waiter should logged successfully', () => {
    // estableciendo el valor de retorno del método
    loginService.postUsers.and.returnValue(of({
      accessToken: "token1",
      user: {
        email: "meseroprueba.hopper@systers.xyz",
        password: "123456",
        roles: {
          mesero: true,
          admin: false,
          cocina: false
        }
      }
    }));
    //invocar el método del componente
    component.login();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/waiter/breakfast'])
  });

  it('admin should logged successfully', () => {
    loginService.postUsers.and.returnValue(of({
      accessToken: "token2",
      user: {
        email: "adminprueba.hopper@systers.xyz",
        password: "123456",
        roles: {
          mesero: false,
          admin: true,
          cocina: false
        }
      }
    }));
    component.login();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/users'])
  });

  it('chef should logged successfully', () => {
    loginService.postUsers.and.returnValue(of({
      accessToken: "token3",
      user: {
        email: "chefprueba.hopper@systers.xyz",
        password: "123456",
        roles: {
          mesero: false,
          admin: false,
          cocina: true
        }
      }
    }));
    component.login();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/chef/pending'])
  });

});
