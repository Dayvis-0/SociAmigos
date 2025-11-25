import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-post-modal.html',
  styleUrl: './create-post-modal.css'
})
export class CreatePostModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() publishPost = new EventEmitter<string>();
  
  isOpen = false;
  postContent = '';
  isEditMode = false;

  open(content?: string): void {
    this.isOpen = true;
    if (content) {
      this.postContent = content;
      this.isEditMode = true;
    } else {
      this.postContent = '';
      this.isEditMode = false;
    }
  }

  close(): void {
    this.isOpen = false;
    this.postContent = '';
    this.isEditMode = false;
    this.closeModal.emit();
  }

  onPublish(): void {
    if (this.postContent.trim()) {
      this.publishPost.emit(this.postContent.trim());
      this.close();
    }
  }

  onPhotoClick(): void {
    alert('Función de agregar foto/video en desarrollo');
  }

  onLocationClick(): void {
    alert('Función de agregar ubicación en desarrollo');
  }

  get isPublishDisabled(): boolean {
    return this.postContent.trim().length === 0;
  }

  get modalTitle(): string {
    return this.isEditMode ? 'Editar publicación' : 'Crear publicación';
  }

  get publishButtonText(): string {
    return this.isEditMode ? 'Actualizar' : 'Publicar';
  }
}