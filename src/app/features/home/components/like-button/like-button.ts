import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './like-button.html',
  styleUrls: ['./like-button.css']
})
export class LikeButtonComponent {
  @Input() liked: boolean = false;
  @Input() likesCount: number = 0;
  @Input() showCount: boolean = true;
  @Output() likeToggle = new EventEmitter<void>();

  onLikeClick(): void {
    this.likeToggle.emit();
  }
}