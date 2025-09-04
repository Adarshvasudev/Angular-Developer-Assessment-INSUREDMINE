import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterListComponent } from './character-list/character-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CharacterListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'starWarApp';
}
