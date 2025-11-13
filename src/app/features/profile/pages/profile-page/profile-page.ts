import { Component } from '@angular/core';
import { ProfilePosts } from '../../components/profile-posts/profile-posts';
import { ProfileHeader } from '../../components/profile-header/profile-header';
import { ProfileTabs } from '../../components/profile-tabs/profile-tabs';

@Component({
  selector: 'app-profile-page',
  imports: [ProfilePosts, ProfileHeader, ProfileTabs],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {

}
