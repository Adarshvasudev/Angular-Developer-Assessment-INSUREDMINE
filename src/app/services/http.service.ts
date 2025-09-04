import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://swapi.info/api/people';

  getPeople(): Observable<any> {
    return this.http.get<any>('https://swapi.info/api/people');
  }
  getAllSpecies(): Observable<any> {
    return this.http.get<any>('https://swapi.info/api/species');
  }
  getAllMovies(): Observable<any> {
    return this.http.get<any>('https://swapi.info/api/films');
  }
  getAllVechicles(): Observable<any> {
    return this.http.get<any>('https://swapi.info/api/vehicles');
  }
  getAllStarship(): Observable<any> {
    return this.http.get<any>('https://swapi.info/api/starships');
  }
  getPerson(url: any): Observable<any> {
    return this.http.get<any>(url);
  }
  public detailsSource = new BehaviorSubject<any | null>(null);
  sendDeatilsobs = this.detailsSource.asObservable();

  sendDeatils(obj: any) {
    this.detailsSource.next(obj);
  }
}
