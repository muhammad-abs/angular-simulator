import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { tap, catchError, EMPTY } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router); 
  
  public errorMessage: string | null = null;
  public isLoading: boolean = false;
  
  public loginForm: FormGroup = this.fb.group({
    username: ['emilys', [Validators.required]],
    password: ['emilyspass', [Validators.required]],
  });
  
  onSubmit(): void {
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = null;
    
    this.authService.login(this.loginForm.value).pipe(
      tap(() => {
        this.isLoading = false;
        this.router.navigate(['/posts']);
      }),
      catchError((err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Неверный логин или пароль';
        return EMPTY;
      })
    ).subscribe();
  }
  
}
