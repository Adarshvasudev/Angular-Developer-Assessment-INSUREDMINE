import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { MatIcon } from '@angular/material/icon';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  personDetails: any;
  filterData: any;
  constructor(private route: ActivatedRoute, public httpSevice: HttpService) {}
  private router = inject(Router);
  ngOnInit() {
    this.httpSevice.detailsSource.pipe().subscribe((obj) => {
      this.filterData = obj;
    });
    this.route.queryParams.subscribe((params) => {
      const person = params['data'];
      this.loadPersonDetails(person);
    });
  }

  loadPersonDetails(url: any) {
    this.httpSevice.getPerson(url).subscribe((element) => {
      let filmsDeatils = this.filterData.filmsDeatils;
      let vechicleDeatils = this.filterData.vechicleDeatils;
      let shipDeatils = this.filterData.shipDeatils;
      let speciesNames = this.filterData.species;

      const obj = {
        name: element.name,
        birth_year: element.birth_year,
        speciesNames: speciesNames,
        speciesUrl: element.species,
        url: element.url,
        films: element.films,
        filmsDeatils: filmsDeatils,
        vehicles: element.vehicles,
        vechicleDeatils: vechicleDeatils,
        starships: element.starships,
        shipDeatils: shipDeatils,
        gender: element.gender,
        height: element.height,
        mass: element.mass,
        hair_color: element.hair_color,
        skin_color: element.skin_color,
        eye_color: element.eye_color,
      };

      this.personDetails = obj;
    });
  }
  backToList() {
    this.router.navigate([''], {});
  }
}
