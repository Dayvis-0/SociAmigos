import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Suggestion {
  initials: string;
  name: string;
  mutualFriends: number;
  gradient: string;
  following: boolean;
}

@Component({
  selector: 'app-sidebar-left',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-left.html',
  styleUrl: './sidebar-left.css'
})
export class SidebarLeftComponent {
  suggestions: Suggestion[] = [
    {
      initials: 'RM',
      name: 'Roberto Morales',
      mutualFriends: 4,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      following: false
    },
    {
      initials: 'PT',
      name: 'Patricia Torres',
      mutualFriends: 6,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      following: false
    },
    {
      initials: 'MV',
      name: 'Miguel Vargas',
      mutualFriends: 2,
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      following: false
    }
  ];

  toggleFollow(suggestion: Suggestion): void {
    suggestion.following = !suggestion.following;
  }
}