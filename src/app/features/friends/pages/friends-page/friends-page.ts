import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../../../shared/components/navbar/navbar';

interface Friend {
  initials: string;
  name: string;
  mutualFriends: number;
  gradient: string;
}

@Component({
  selector: 'app-friends-page',
  standalone: true,
  imports: [CommonModule, Navbar, FormsModule],
  templateUrl: './friends-page.html',
  styleUrl: './friends-page.css'
})
export class FriendsPage {
  activeTab: string = 'todos';
  searchQuery: string = '';
  totalFriends: number = 248;

  tabs = [
    { id: 'todos', label: 'Todos los amigos' },
    { id: 'sugerencias', label: 'Sugerencias' },
    { id: 'solicitudes', label: 'Solicitudes' }
  ];

  friends: Friend[] = [
    { initials: 'AP', name: 'Ana Pérez', mutualFriends: 15, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { initials: 'DL', name: 'David López', mutualFriends: 22, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { initials: 'SF', name: 'Sofía Fernández', mutualFriends: 8, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { initials: 'RM', name: 'Roberto Morales', mutualFriends: 12, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { initials: 'PT', name: 'Patricia Torres', mutualFriends: 18, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { initials: 'MV', name: 'Miguel Vargas', mutualFriends: 9, gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    { initials: 'CL', name: 'Carmen López', mutualFriends: 14, gradient: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)' },
    { initials: 'AL', name: 'Alberto Luna', mutualFriends: 20, gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
    { initials: 'VH', name: 'Valeria Herrera', mutualFriends: 11, gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
    { initials: 'JR', name: 'Jorge Ramírez', mutualFriends: 6, gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
    { initials: 'LC', name: 'Laura Castro', mutualFriends: 17, gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
    { initials: 'MS', name: 'Mario Sánchez', mutualFriends: 13, gradient: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)' }
  ];

  get filteredFriends(): Friend[] {
    if (!this.searchQuery.trim()) {
      return this.friends;
    }
    
    const query = this.searchQuery.toLowerCase();
    return this.friends.filter(friend => 
      friend.name.toLowerCase().includes(query)
    );
  }

  onTabChange(tabId: string): void {
    this.activeTab = tabId;
    console.log('Tab activo:', tabId);
  }

  onFriendsClick(friend: Friend): void {
    console.log('Botón Amigos clickeado:', friend.name);
  }

  onMessageClick(friend: Friend): void {
    console.log('Botón Mensaje clickeado:', friend.name);
  }
}