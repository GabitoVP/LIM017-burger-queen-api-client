import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login(){
    this.loginService.postUsers(this.loginForm.value)
    .subscribe({
      next: (res) =>{
        console.log("next de el servicio",res)
        if(res && res.user.roles.admin){
          this.toastr.success('Administrador', 'Logueado con exito');
          this.loginForm.reset();
          localStorage.setItem('roles','admin')
          localStorage.setItem('token',res.accessToken)
          this.router.navigate(['/admin/users']);
        }
        if(res && res.user.roles.mesero){
          this.toastr.success('Empleado-meser@', 'Logueado con exito');
          this.loginForm.reset();

          localStorage.setItem('roles','waiter')
          localStorage.setItem('ID',res.user.id)
          localStorage.setItem('token',res.accessToken)

          this.router.navigate(['/waiter/breakfast']);
        }
        if(res && res.user.roles.cocina){
          this.toastr.success('Empleado-chef', 'Logueado con exito');
          this.loginForm.reset();

          localStorage.setItem('roles','chef')
          localStorage.setItem('ID',res.user.id)
          localStorage.setItem('token',res.accessToken)

          this.router.navigate(['/chef/pending']);
        }
        else if(res.status === 400){
          this.toastr.error('Usuario o contraseña incorrectas', 'ERROR', {
            timeOut: 3000,
          });
        }

      },error: (res) => {
        console.log(res)
        this.toastr.error('Usuario o contraseña incorrectas', 'ERROR', {
          timeOut: 3000,
        });
      }
    })
  }
}
