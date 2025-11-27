// src/app/core/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  user,
  User as FirebaseUser
} from '@angular/fire/auth';
import { 
  Firestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp 
} from '@angular/fire/firestore';
import { Observable, from, of, BehaviorSubject } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { User, RegisterData, LoginData } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  // Observable del usuario de Firebase Auth
  private user$ = user(this.auth);
  
  // BehaviorSubject para manejar el estado del usuario actual
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Estado de carga
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {
    // Escuchar cambios en la autenticación
    this.user$.pipe(
      switchMap(firebaseUser => {
        if (firebaseUser) {
          return this.getUserData(firebaseUser.uid);
        } else {
          return of(null);
        }
      })
    ).subscribe(user => {
      this.currentUserSubject.next(user);
    });
  }

  // ==================== REGISTRO ====================
  async register(data: RegisterData): Promise<void> {
    try {
      this.loadingSubject.next(true);

      // 1. Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        data.email,
        data.password
      );

      const firebaseUser = userCredential.user;
      const displayName = `${data.firstName} ${data.lastName}`;

      // 2. Actualizar perfil en Authentication
      await updateProfile(firebaseUser, { displayName });

      // 3. Crear documento de usuario en Firestore
      const birthDate = new Date(data.year, data.month - 1, data.day);
      
      const userData: User = {
        uid: firebaseUser.uid,
        email: data.email,
        displayName: displayName,
        photoURL: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(displayName),
        bio: '',
        birthDate: birthDate,
        gender: data.gender,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await this.createUserDocument(firebaseUser.uid, userData);
      
      this.currentUserSubject.next(userData);
      
      // 4. Redirigir al feed
      await this.router.navigate(['/feed']);
      
    } catch (error: any) {
      this.handleAuthError(error);
      throw error;
    } finally {
      this.loadingSubject.next(false);
    }
  }

  // ==================== LOGIN ====================
  async login(data: LoginData): Promise<void> {
    try {
      this.loadingSubject.next(true);

      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        data.email,
        data.password
      );

      const userData = await this.getUserData(userCredential.user.uid).toPromise();
      
      if (userData) {
        this.currentUserSubject.next(userData);
        await this.router.navigate(['/feed']);
      }

    } catch (error: any) {
      this.handleAuthError(error);
      throw error;
    } finally {
      this.loadingSubject.next(false);
    }
  }

  // ==================== LOGIN CON GOOGLE ====================
  async loginWithGoogle(): Promise<void> {
    try {
      this.loadingSubject.next(true);
      
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      
      const userCredential = await signInWithPopup(this.auth, provider);
      const firebaseUser = userCredential.user;

      // Verificar si el usuario ya existe en Firestore
      const userDoc = await getDoc(doc(this.firestore, 'users', firebaseUser.uid));

      if (!userDoc.exists()) {
        // Si es un usuario nuevo, crear su documento
        const userData: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || 'Usuario',
          photoURL: firebaseUser.photoURL || '',
          bio: '',
          birthDate: new Date(), // Fecha por defecto
          gender: 'custom',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        await this.createUserDocument(firebaseUser.uid, userData);
        this.currentUserSubject.next(userData);
      } else {
        const userData = userDoc.data() as User;
        this.currentUserSubject.next(userData);
      }

      await this.router.navigate(['/feed']);

    } catch (error: any) {
      this.handleAuthError(error);
      throw error;
    } finally {
      this.loadingSubject.next(false);
    }
  }

  // ==================== LOGOUT ====================
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.currentUserSubject.next(null);
      await this.router.navigate(['/auth/login']);
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  // ==================== RECUPERAR CONTRASEÑA ====================
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error: any) {
      this.handleAuthError(error);
      throw error;
    }
  }

  // ==================== OBTENER DATOS DEL USUARIO ====================
  private getUserData(uid: string): Observable<User | null> {
    const userDocRef = doc(this.firestore, 'users', uid);
    
    return from(getDoc(userDocRef)).pipe(
      map(docSnap => {
        if (docSnap.exists()) {
          const data = docSnap.data() as User;
          return {
            ...data,
            birthDate: data.birthDate instanceof Date ? data.birthDate : (data.birthDate as any).toDate(),
            createdAt: data.createdAt instanceof Date ? data.createdAt : (data.createdAt as any).toDate(),
            updatedAt: data.updatedAt instanceof Date ? data.updatedAt : (data.updatedAt as any).toDate()
          };
        }
        return null;
      }),
      catchError(error => {
        console.error('Error al obtener datos del usuario:', error);
        return of(null);
      })
    );
  }

  // ==================== CREAR DOCUMENTO DE USUARIO ====================
  private async createUserDocument(uid: string, userData: User): Promise<void> {
    const userDocRef = doc(this.firestore, 'users', uid);
    await setDoc(userDocRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }

  // ==================== ACTUALIZAR PERFIL ====================
  async updateUserProfile(uid: string, updates: Partial<User>): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, 'users', uid);
      await updateDoc(userDocRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });

      // Actualizar el usuario actual
      const updatedUser = await this.getUserData(uid).toPromise();
      if (updatedUser) {
        this.currentUserSubject.next(updatedUser);
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  }

  // ==================== VERIFICAR SI ESTÁ AUTENTICADO ====================
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // ==================== OBTENER USUARIO ACTUAL ====================
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // ==================== MANEJO DE ERRORES ====================
  private handleAuthError(error: any): void {
    let errorMessage = 'Ha ocurrido un error';

    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Este correo ya está registrado';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Correo electrónico inválido';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Operación no permitida';
        break;
      case 'auth/weak-password':
        errorMessage = 'La contraseña es muy débil';
        break;
      case 'auth/user-disabled':
        errorMessage = 'Este usuario ha sido deshabilitado';
        break;
      case 'auth/user-not-found':
        errorMessage = 'Usuario no encontrado';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Contraseña incorrecta';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Credenciales inválidas';
        break;
      case 'auth/popup-closed-by-user':
        errorMessage = 'Ventana de autenticación cerrada';
        break;
      default:
        errorMessage = error.message || 'Error desconocido';
    }

    console.error('Error de autenticación:', errorMessage, error);
  }
}