import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/models/employees';
import { UsersService } from 'src/app/services/users.service';
import { ModalNewUsersComponent } from '../modal-new-users/modal-new-users.component';

//interface para header de tabla user
export interface ProductsData {
  name: string;
  price: string;
  image: string;
  type: string;
  action: string
}

@Component({
  selector: 'app-home-admin-users',
  templateUrl: './home-admin-users.component.html',
  styleUrls: ['./home-admin-users.component.css']
})
export class HomeAdminUsersComponent implements OnInit {
  users: Users[] = [];
  rolAdmin = 'administrador';
  rolMesero = 'mesero';
  rolChef = 'chef';

  constructor(private usersService: UsersService, private modalNewUser:MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(): void {
    this.usersService.getUsersMethod().subscribe((users) => (this.users = users));
  }

  deleteUsers(users: Users){
    this.usersService
    .deleteUsersMethod(users)
    .subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== users.id);
        this.toastr.success('Usuario eliminado', 'Eliminado con exito');
        this.getAllUsers();
      },
      error: () => {
        this.toastr.error('No se pudo eliminar producto', 'ERROR', {
          timeOut: 3000,
        });
      }
    })
  }

  editUsers(row: Users){
    this.modalNewUser.open(ModalNewUsersComponent, {
      minWidth: "450px",
      width:"30%",
      data : row
    }).afterClosed().subscribe((value) =>{
      if (value==="update"){
        this.getAllUsers();
      }
    })
  }

  openDialog() {
    this.modalNewUser.open(ModalNewUsersComponent, {
      minWidth: "450px",
      width:"30%"
    }).afterClosed().subscribe(val=>{
      if(val==="save"){
        this.getAllUsers();
      }
    })
  }

}
