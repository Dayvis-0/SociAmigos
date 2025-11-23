import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Comment {
  id: number;
  author: string;
  text: string;
  time: string;
  likes: number;
  liked: boolean;
  replies?: Comment[];
}

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-section.html',
  styleUrl: './comment-section.css'
})
export class CommentSectionComponent {
  @Input() postId!: number;
  @Input() commentsCount: number = 0;
  
  showComments = false;
  newCommentText = '';
  
  comments: Comment[] = [
    {
      id: 1,
      author: 'Ana García',
      text: '¡Qué hermosa foto! Me encanta 😍',
      time: '2 h',
      likes: 12,
      liked: false,
      replies: [
        {
          id: 11,
          author: 'Carlos Ruiz',
          text: 'Totalmente de acuerdo! 👍',
          time: '1 h',
          likes: 0,
          liked: false
        }
      ]
    },
    {
      id: 2,
      author: 'Luis Martínez',
      text: 'Increíble momento 📸',
      time: '3 h',
      likes: 5,
      liked: false
    }
  ];

  toggleComments(): void {
    this.showComments = !this.showComments;
  }

  toggleLike(comment: Comment): void {
    comment.liked = !comment.liked;
    comment.likes += comment.liked ? 1 : -1;
  }

  addComment(): void {
    if (this.newCommentText.trim()) {
      const newComment: Comment = {
        id: Date.now(),
        author: 'Tú',
        text: this.newCommentText.trim(),
        time: 'Justo ahora',
        likes: 0,
        liked: false
      };
      
      this.comments.push(newComment);
      this.newCommentText = '';
      this.showComments = true;
      this.commentsCount++;
    }
  }

  onReply(comment: Comment): void {
    console.log('Responder a:', comment.author);
    alert(`Funcionalidad de responder a ${comment.author} en desarrollo`);
  }

  onEmojiClick(): void {
    this.newCommentText += '😊';
  }

  onAttachClick(): void {
    alert('Función de adjuntar en desarrollo');
  }

  onGifClick(): void {
    alert('Función de GIF en desarrollo');
  }

  onStickerClick(): void {
    alert('Función de sticker en desarrollo');
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.addComment();
    }
  }
}