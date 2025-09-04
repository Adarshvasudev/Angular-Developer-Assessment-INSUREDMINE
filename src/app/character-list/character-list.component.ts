import { Component, inject, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpService } from '../services/http.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIcon,
    ReactiveFormsModule,
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css',
})
export class CharacterListComponent {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  private _snackBar = inject(MatSnackBar);
  private httpSevice = inject(HttpService);
  private router = inject(Router);
  pageSize = 5;
  pageInd = 0;
  moviesList: any = [];
  speciesList: any = [];
  PepoleList: any = [];
  displayedColumns: string[] = ['Sl', 'name', 'species', 'year', 'actions'];
  vechiclesList: any = [];
  starshipList: any = [];
  dataSource: any = [];
  birthYearList: any = [];
  dataSourceWithPageSize: any = [];
  public filterForm: FormGroup = new FormGroup({
    movies: new FormControl(null),
    species: new FormControl(null),
    vechicles: new FormControl(null),
    starship: new FormControl(null),
    birthYear: new FormControl(null),
  });

  ngOnInit() {
    this.loadFilters();
  }
  loadFilters() {
    this.httpSevice.getAllMovies().subscribe((data) => {
      this.moviesList = data;
    });
    this.httpSevice.getAllSpecies().subscribe((data) => {
      this.speciesList = data;
    });
    this.httpSevice.getAllVechicles().subscribe((data) => {
      this.vechiclesList = data;
    });
    this.httpSevice.getAllStarship().subscribe((data) => {
      this.starshipList = data;
    });
    this.loadPeople();
  }
  loadPeople() {
    this.httpSevice.getPeople().subscribe((data) => {
      data.forEach((element: any) => {
        let speciesNames = '--';
        if (element.species.length) {
          speciesNames = element.species
            .map((speciesUrl: string) => {
              const speciesObj = this.speciesList.find(
                (s: any) => s.url === speciesUrl
              );

              return speciesObj ? speciesObj.name : '';
            })
            .filter((name: string) => name !== '')
            .join(', ');
        }
        let filmsDeatils = [];
        if (element.films.length) {
          filmsDeatils = element.films.map((filmUrl: string) => {
            const filmObj = this.moviesList.find((m: any) => m.url === filmUrl);
            return filmObj;
          });
        }
        let vechicleDeatils = [];
        if (element.vehicles.length) {
          vechicleDeatils = element.vehicles.map((vechUrl: string) => {
            const vechicleObj = this.vechiclesList.find(
              (m: any) => m.url === vechUrl
            );
            return vechicleObj;
          });
        }
        let shipDeatils = [];
        if (element.starships.length) {
          shipDeatils = element.starships.map((shipUrl: string) => {
            const shipObj = this.starshipList.find(
              (m: any) => m.url === shipUrl
            );
            return shipObj;
          });
        }

        const obj = {
          name: element.name,
          birth_year: element.birth_year,
          species: speciesNames,
          speciesUrl: element.species,
          url: element.url,
          films: element.films,
          filmsDeatils: filmsDeatils,
          vehicles: element.vehicles,
          vechicleDeatils: vechicleDeatils,
          starships: element.starships,
          shipDeatils: shipDeatils,
        };

        this.PepoleList.push(obj);

        if (
          element.birth_year !== 'unknown' &&
          !this.birthYearList.includes(element.birth_year)
        ) {
          this.birthYearList.push(element.birth_year);
        }
      });

      this.dataSource = new MatTableDataSource(this.PepoleList);
      this.dataSource.paginator = this.paginator;
    });
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageInd = event.pageIndex;
  }

  applyFilter() {
    const filters = this.filterForm.value;
    let filteredList = this.PepoleList;
    this.dataSource = new MatTableDataSource([]);
    this._snackBar.open('Filter Applied', 'Close', { duration: 2000 });

    if (filters.movies) {
      filteredList = filteredList.filter((person: any) =>
        filters.movies.every((movie: string) => person.films.includes(movie))
      );
    }
    if (filters.species) {
      filteredList = filteredList.filter((person: any) =>
        filters.species.every((speci: string) =>
          person.speciesUrl.includes(speci)
        )
      );
    }
    if (filters.vechicles) {
      filteredList = filteredList.filter((person: any) =>
        filters.vechicles.every((van: string) => person.vehicles.includes(van))
      );
    }
    if (filters.starship) {
      filteredList = filteredList.filter((person: any) =>
        filters.starship.every((star: string) =>
          person.starships.includes(star)
        )
      );
    }
    if (filters.birthYear) {
      filteredList = filteredList.filter((person: any) =>
        filters.birthYear.includes(person.birth_year)
      );
    }

    this.dataSource = new MatTableDataSource(filteredList);
    this.dataSource.paginator = this.paginator;
  }
  viewDetails(person: any) {
    this.router.navigate(['/detail'], {
      queryParams: { data: person.url },
    });
    this.httpSevice.sendDeatils(person);
  }
  clearFilter() {
    this.filterForm.reset();
    this.dataSource = new MatTableDataSource(this.PepoleList);
    this.dataSource.paginator = this.paginator;
  }
}
