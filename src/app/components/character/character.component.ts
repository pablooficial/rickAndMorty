import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { Character } from '../../shared/models/characters-model';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../core/favorites-service/favorites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CharacterComponent {
  //INJEÇÕES DE DEPENDÊNCIA
  private favoritesService: FavoritesService = inject(FavoritesService);
  private router: Router = inject(Router);

  //DECORATORS
  @Input() character!: Character;
  @Output() removeFavorite: EventEmitter<Character> = new EventEmitter();

  toggleFavorito(character: Character): void {
    this.character.isFavorite = !this.character.isFavorite;
    if (!this.favoritesService.characterIsFavorite(character.id)) {
      this.favoritesService.addFavorite(character);
    } else {
      this.favoritesService.removeFavorite(character.id);
      this.removeFavorite.emit(character);
    }
  }

  characterIsFavorite(character: Character): boolean {
    return this.favoritesService.characterIsFavorite(character.id);
  }

  setRouter(character: Character): void {
    this.router.navigate([`/detalhes/${character.id}`]);
  }
}
