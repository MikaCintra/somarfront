import { Component } from '@angular/core';
import { DefaultLoginLayout } from '../../../../layout/default-login-layout/default-login-layout';
import { FormControl, FormGroup, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInput } from '../../../../shared/components/primary-input/primary-input';
import { UserTypeSelector } from '../../../../layout/user-type-selector/user-type-selector';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth.service';
// import { ToastrService } from 'ngx-toastr';

interface SignupForm{
  userType: FormControl,
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  imports: [
    DefaultLoginLayout,
    ReactiveFormsModule,
    PrimaryInput,
    UserTypeSelector
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    // private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      userType: new FormControl(null, [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })  
  }

  submit(){
    const userType = this.signupForm.value.userType;
    
    this.loginService.signup(
      this.signupForm.value.name,
      this.signupForm.value.email, 
      this.signupForm.value.password,
      userType
    ).subscribe({
      next: () => {
        alert("Conta criada com sucesso! Comece a fazer a diferença 🌟");
        
        // Redireciona baseado no tipo de usuário
        if (userType === 'ong') {
          this.router.navigate(['/dashboard/ong']);
        } else {
          this.router.navigate(['/dashboard/doador']);
        }
      },
      error: () => alert("Erro ao criar conta. Tente novamente.")
    })
  }

  navigate(){
    this.router.navigate(["/login"])
  }
}
