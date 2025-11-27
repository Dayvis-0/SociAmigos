// src/app/core/models/user.model.ts
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  birthDate: Date;
  gender: 'male' | 'female' | 'custom';
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  day: number;
  month: number;
  year: number;
  gender: 'male' | 'female' | 'custom';
}

export interface LoginData {
  email: string;
  password: string;
}