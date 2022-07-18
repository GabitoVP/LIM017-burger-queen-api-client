import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {OverlayModule} from '@angular/cdk/overlay';
import { of, throwError } from 'rxjs';

import { HomeAdminUsersComponent } from './home-admin-users.component';

describe('HomeAdminUsersComponent', () => {
  let component: HomeAdminUsersComponent;
  let fixture: ComponentFixture<HomeAdminUsersComponent>;
  let httpTestingController: HttpTestingController;
  //spy del servicio
  let usersServiceMock: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
   //spy del método que usaremos del servicio
   usersServiceMock = jasmine.createSpyObj<UsersService>('UsersService', ['getUsersMethod', 'deleteUsersMethod']);

    await TestBed.configureTestingModule({
      declarations: [ HomeAdminUsersComponent ],
      imports:[
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        OverlayModule,
        MatDialogModule,
      ],
      providers:[
        // UsersService,
        ToastrService,
       { provide: UsersService, useValue: usersServiceMock }
      ]
    })
    .compileComponents();

    usersServiceMock.getUsersMethod.and.returnValue(of(
      [
        {
          email: "anita.borg@systers.xyz",
          password: "$2a$10$ZdoOR/3DP6TSVgdVRtsLK.RyGyiqMetOfia4gOmwYmxLjLyPEisxG",
          roles: {
            admin: true,
            mesero: false,
            cocina: false
          },
         id: 1
        },
        {
          emai: "meseroprueba.hopper@systers.xyz",
          password: "$2a$10$nOEjtXX6XrIgfLFqYGB3sOKUbeKfHkGFJB2oF96AnRuKlkH2nwbHG",
          roles: {
            mesero: true,
            admin: false,
            cocina: false
          },
          id: 3
        },
        {
          email: "cocineroprueba.hopper@systers.xyz",
          password: "$2a$10$ZoVmy6wdOktZy/Esqewqaug4SoWdocddwjT/7YN6Lzxd15oi5ib4i",
          roles: {
           mesero: false,
            admin: false,
            cocina: true
          },
          id: 4
        },
      ]
    ));

    fixture = TestBed.createComponent(HomeAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('getAllUsers should return an array of user objects', () => {
    expect(component.users.length).toBe(3);
  })


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render message with value "Crear Usuario"', () => {
    const compiled  = fixture.nativeElement;
    expect(compiled.querySelector('.optionAddUsers p').textContent).toBe('Crear Usuario')
  });

  it('openDialog to have been called', () => {
//spyOn(someObj, 'func').and.returnValue(42);
//let spy = spyOn<MyComponent, any>(component,'close')

    //const spy = spyOn<HomeAdminUsersComponent, any>(component,'openDialog')
    const spy = spyOn(component,'openDialog');

    const compiled  = fixture.nativeElement;
    const btn = compiled.querySelector('.optionAddUsers');

// const buttonElement = fixture.debugElement.query(By.css('.send-button'));
   // btn.triggerEventHandler('click', null);
   btn.click();

    expect(spy).toHaveBeenCalled();
  });




});
