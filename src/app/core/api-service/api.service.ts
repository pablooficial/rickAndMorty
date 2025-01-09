import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Character, CharacterResponse } from '../../shared/models/characters-model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //INJEÇÃO DE DEPENDÊNCIA
  private http: HttpClient = inject(HttpClient);

  //VARIÁVEIS
  public base_url: string = environment.base_url;
  public locationUrl: string = this.base_url + 'location';
  private apiFilter = this.base_url + 'character/';

  getAllCharacters(page: number): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.base_url}character/?page=${page}`)
  }

  getById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.base_url}character/${id}`)
  }

  getLocation(): Observable<Object> {
    return this.http.get(this.locationUrl)
  }

  filterCharacters(name: string, page: number): Observable<CharacterResponse> {
    const queryParams = [];
    if (page) {
      queryParams.push(`page=${page}`);
    }
    if (name) {
      queryParams.push(`name=${name}`);
    }
    const url = this.apiFilter + `?` + queryParams.join('&');

    return this.http.get<CharacterResponse>(url);
  }
}
