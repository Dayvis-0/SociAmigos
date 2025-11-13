import { Component } from '@angular/core';
import { VideoPlayer } from '../../components/video-player/video-player';

@Component({
  selector: 'app-videos-page',
  imports: [VideoPlayer],
  templateUrl: './videos-page.html',
  styleUrl: './videos-page.css',
})
export class VideosPage {

}
