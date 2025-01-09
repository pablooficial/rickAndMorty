import { Component, inject } from '@angular/core';
import { CharacterListComponent } from '../components/character-list/character-list.component';
import { ApiService } from '../core/api-service/api.service';
import {
  Character,
  CharacterResponse,
} from '../shared/models/characters-model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmptyCharactersComponent } from '../shared/components/empty-characters/empty-characters.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CharacterListComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    EmptyCharactersComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  //INJEÇÃO DE DEPENDÊNCIAS----------------------------------------------
  private apiService: ApiService = inject(ApiService);
  //----------------------------------------------------------------------

  //VARIÁVEIS------------------------------------------------------------
  public characters: Character[] = [];
  public page: number = 1;
  searchValue: string = '';
  //----------------------------------------------------------------------

  async ngOnInit() {
    await this.getAllCharacters();
  }

  getAllCharacters() {
    return new Promise((resolve, reject) => {
      this.apiService.getAllCharacters(this.page).subscribe({
        next: (res: CharacterResponse) => {
          this.characters = res.results;
          resolve(true);
        },
        error: (err) => {
          console.error(err);
          reject(false);
        },
      });
    });
  }

  nextPage(name: string) {
    this.page++;
    if (
      name != ''
    ) {
      this.filterCharacters(name, this.page, true);
    } else {
      this.getAllCharacters();
    }
  }

  previousPage(name: string) {
    if (this.page > 1) {
      this.page--;
      if (
        name != ''
      ) {
        this.filterCharacters(name, this.page, true);
      } else {
        this.getAllCharacters();
      }
    }
  }

  filterCharacters(name: string, page: number, pagination?: boolean) {
    this.page = page;
    this.apiService
      .filterCharacters(
        name,
        this.page
      )
      .subscribe({
        next: (data: CharacterResponse) => {
          this.characters = data.results;
        },
        error: (err) => {
          console.error(err);
          if(!pagination) {
            this.characters = [];
          }
        },
      });
  }
}
