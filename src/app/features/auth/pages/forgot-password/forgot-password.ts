import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  isLoading = false;
  emailSent = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotForm.valid) {
      this.isLoading = true;
      const email = this.forgotForm.value.email;

      // Simulación de envío de email
      setTimeout(() => {
        this.isLoading = false;
        this.emailSent = true;
        console.log('Email de recuperación enviado a:', email);
        
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 3000);
      }, 1500);
    } else {
      this.forgotForm.get('email')?.markAsTouched();
    }
  }

  onBackToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  get email() {
    return this.forgotForm.get('email');
  }
}