import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  errors: string[] = [];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  }



  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const controlValue = control.value;

    const errors: string[] = [];

    if (controlValue.length < 8) errors.push("En az 8 karakter olmalıdır.");
    if (!/[A-Z]/.test(controlValue)) errors.push("En az bir büyük harf içermelidir.");
    if (!/[a-z]/.test(controlValue)) errors.push("En az bir küçük harf içermelidir.");
    if (!/\d/.test(controlValue)) errors.push("En az bir rakam içermelidir.");
    if (!/[@$!%*?&]/.test(controlValue)) errors.push("En az bir özel karakter (@$!%*?&) içermelidir.");

    return errors.length > 0 ? { passwordInvalid: errors } : null;
  }

  // Hata mesajlarını döndüren fonksiyon
  getPasswordErrors(): string[] {
    return this.loginForm.get('password')?.errors?.['passwordInvalid'] || [];
  }


  submit() {
    if (this.loginForm.valid) {
      this.authService.logIN(this.loginForm.value).subscribe({
        next: (data) => {
          //console.log(data);
          localStorage.setItem('token', data.accessToken);
          this.router.navigate(['/home']);

        },
        error: (error) => {
          console.error('Login failed', error);
        }
      })
    }
    else {
      console.log('Login failed2222');

    }
  }






}
