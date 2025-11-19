import { Component } from '@angular/core';
import { DefaultLoginLayout } from '../../../../layout/default-login-layout/default-login-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInput } from '../../../../shared/components/primary-input/primary-input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginLayout,
    ReactiveFormsModule,
    PrimaryInput
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    // private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      senha: new FormControl('',[Validators.required, Validators.minLength(6)])
    })  
  }

  submit(){
    console.log(this.loginForm.value)
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.senha).subscribe({
      next: () => {
        const tipo = this.loginService.getUserType();
        const username = this.loginService.getUsername();

        console.log("Tipo do usuario:", tipo)
        
        alert(`Login realizado com sucesso! Bem-vindo à Somar, ${username}! 🤝`);
        
        // Redireciona baseado no tipo de usuário
        if (tipo === 'ong' || tipo === 'admin') {
          this.router.navigate(['/dashboard/ong']);
        } else {
          this.router.navigate(['/dashboard/doador']);
        }
      },
      error: () => alert("Erro ao fazer login. Verifique suas credenciais.")
    })
  }

  navigate(){
    this.router.navigate(["/signup"])
  }
}
