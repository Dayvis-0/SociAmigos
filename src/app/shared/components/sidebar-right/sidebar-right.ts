import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface OnlineUser {
  initials: string;
  name: string;
  gradient: string;
}

@Component({
  selector: 'app-sidebar-right',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar-right.html',
  styleUrl: './sidebar-right.css'
})
export class SidebarRightComponent {
  onlineUsers: OnlineUser[] = [
    {
      initials: 'AP',
      name: 'Ana Pérez',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      initials: 'DL',
      name: 'Diego López',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      initials: 'SF',
      name: 'Sofía Fernández',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];
}