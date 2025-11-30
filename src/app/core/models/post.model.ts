import { Timestamp } from '@angular/fire/firestore';

/**
 * Interface principal del Post (Post Document en Firestore)
 * Ruta: /posts/{postId}
 */
export interface Post {
  postId: string;                    // ID único del post
  autorId: string;                   // UID del autor
  autorName: string;                 // Nombre del autor
  autorInitials: string;             // Iniciales del autor
  autorPhotoURL?: string;            // Foto del autor
  contenido: string;                 // Contenido del post
  imagenUrl?: string;                // URL de imagen (opcional)
  fecha: Timestamp;                  // Fecha de publicación
  likes: number;                     // Cantidad de likes
  commentsCount: number;             // Cantidad de comentarios
  likedBy: string[];                 // Array de UIDs que dieron like
  createdAt: Timestamp;              // Fecha de creación
  updatedAt: Timestamp;              // Fecha de última actualización
}

/**
 * Interface para crear un nuevo Post
 */
export interface CreatePostData {
  contenido: string;
  imagenUrl?: string;
}

/**
 * Interface para actualizar un Post
 */
export interface UpdatePostData {
  contenido?: string;
  imagenUrl?: string;
}

/**
 * Interface para Post con información adicional (para UI)
 */
export interface PostWithUserInfo extends Post {
  isLikedByCurrentUser: boolean;     // Si el usuario actual dio like
  isAuthor: boolean;                 // Si el usuario actual es el autor
  timeAgo: string;                   // Tiempo transcurrido (ej: "Hace 2 horas")
}

/**
 * Función helper para crear un post vacío
 */
export function createEmptyPost(autorId: string, autorName: string): Partial<Post> {
  return {
    autorId,
    autorName,
    autorInitials: getInitials(autorName),
    contenido: '',
    likes: 0,
    commentsCount: 0,
    likedBy: [],
    fecha: Timestamp.now(),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
}

/**
 * Función helper para obtener iniciales
 */
export function getInitials(name: string): string {
  if (!name) return '??';
  
  const names = name.trim().split(' ');
  if (names.length >= 2) {
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}