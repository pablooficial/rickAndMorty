import { Component, inject, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Character } from '../../shared/models/characters-model';
import { FavoritesService } from '../../core/favorites-service/favorites.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
  standalone: true,
  imports: [MatCardModule],
})
export class CharacterDetailComponent {
  //INJEÇÕES DE DEPENDÊNCIA
  private favoritesService: FavoritesService = inject(FavoritesService);
  //----------------------------------------------------------------------
  //DECORATORS
  @Input() character!: Character;
  //----------------------------------------------------------------------

  characterIsFavorite(character: Character): boolean {
    return this.favoritesService.characterIsFavorite(character.id);
  }

  changeFavoriteState(character: Character): void {
    this.character.isFavorite = !this.character.isFavorite;
    if (!this.favoritesService.characterIsFavorite(character.id)) {
      this.favoritesService.addFavorite(character);
    } else {
      this.favoritesService.removeFavorite(character.id);
    }
  }

}
