import { Routes } from '@angular/router';
import { CharacterListComponent } from './character-list/character-list.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
  {
    path: '',
    component: CharacterListComponent,
  },
  { path: 'detail', component: DetailsComponent },
];
