// src/app/features/auth/pages/forgot-password/forgot-password.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  forgotPasswordForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  loading$ = this.authService.loading$;

  constructor() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.forgotPasswordForm.valid) {
      this.errorMessage = '';
      this.successMessage = '';
      
      try {
        await this.authService.resetPassword(this.forgotPasswordForm.value.email);
        this.successMessage = '¡Correo enviado! Revisa tu bandeja de entrada para recuperar tu contraseña.';
        this.forgotPasswordForm.reset();
      } catch (error: any) {
        this.errorMessage = 'Error al enviar el correo. Verifica que el email sea correcto.';
      }
    } else {
      this.forgotPasswordForm.get('email')?.markAsTouched();
    }
  }

  onBackToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }
}