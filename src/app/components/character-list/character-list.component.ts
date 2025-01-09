import { Component, inject, Input, OnInit } from '@angular/core';
import { CharacterComponent } from '../character/character.component';
import { ApiService } from '../../core/api-service/api.service';
import { Character } from '../../shared/models/characters-model';
import { FavoritesService } from '../../core/favorites-service/favorites.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  standalone: true,
  imports: [CharacterComponent],
  providers: [ApiService]
})
export class CharacterListComponent {
  //INJEÇÃO DE DEPENDÊNCIAS---------------------------------------------
  private favoritesService: FavoritesService = inject(FavoritesService);
  //--------------------------------------------------------------------

  //DECORATORS----------------------------------------------------------
  @Input() characters: Character[] = [];
  //--------------------------------------------------------------------

  removeFavoriteFromPage(character: Character): void {
    this.favoritesService.removeFavorite(character.id);
    this.characters = this.favoritesService.favorites();
  }
}
