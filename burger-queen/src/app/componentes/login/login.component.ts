import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { Users } from 'src/app/employees';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login(){
    this.http.get<Users[]>("http://localhost:3000/users")
    .subscribe({
      next: (res) =>{
        const users = res.find((a:Users)=>{
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if(users && users.roles.admin){
          this.toastr.success('Administrador', 'Logueado con exito');
          this.loginForm.reset();
          // this.router.navigate(['/admin/users']);
          localStorage.setItem('roles','admin')
          localStorage.setItem('userEmail',users.email)
          this.router.navigate(['/admin/users']);
        }
        else if(users && users.roles.admin === false){
          this.toastr.success('Empleado', 'Logueado con exito');
          this.loginForm.reset();

          localStorage.setItem('roles','employ')
          localStorage.setItem('userEmail',users.email)

          this.router.navigate(['/waiter']);
        }
        else{
          this.toastr.error('Usuario o contraseña incorrectas', 'ERROR', {
            timeOut: 3000,
          });
          // alert('usuario no encontrado');
        }
      },error: () => {
        this.toastr.error('Algo salio mal', 'ERROR', {
          timeOut: 3000,
        });
      }
    })
  }
}
