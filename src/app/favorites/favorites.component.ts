import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FavoritesService } from '../core/favorites-service/favorites.service';
import { CharacterListComponent } from '../components/character-list/character-list.component';
import { EmptyCharactersComponent } from '../shared/components/empty-characters/empty-characters.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CharacterListComponent, EmptyCharactersComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  //INJEÇÃO DE DEPENDÊNCIAS
  private favoritesService: FavoritesService = inject(FavoritesService);
  //----------------------------------------------------------------------

  //VARIÁVEIS------------------------------------------------------------
  public characters = this.favoritesService.favorites();
  //----------------------------------------------------------------------

  removeAll() {
    this.favoritesService.removeAllFavorites();
    this.characters = this.favoritesService.favorites();
  }
 }
