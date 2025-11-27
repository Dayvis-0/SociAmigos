import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  sendPasswordResetEmail(email: string): Observable<void> {
    // Simulación de envío de email (reemplazar con lógica real de Firebase)
    console.log('Enviando email de recuperación a:', email);
    return of(void 0).pipe(delay(1500));
  }
}