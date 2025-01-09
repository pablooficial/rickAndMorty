import { computed, Injectable, Signal, signal } from '@angular/core';
import { Character } from '../../shared/models/characters-model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesSignal = signal<Character[]>(this.loadFavorites());
  public favoritesQuantitySignal = computed(() => this.favoritesSignal().length);

  get favorites(): Signal<Character[]> {
    return this.favoritesSignal.asReadonly();
  }

  addFavorite(character: Character): void {
    const updatedFavorites = [...this.favoritesSignal(), character];
    this.favoritesSignal.set(updatedFavorites);
    this.saveFavorites(updatedFavorites);
  }

  removeFavorite(id: number): void {
    const updatedFavorites = this.favoritesSignal().filter(p => p.id !== id);
    this.favoritesSignal.set(updatedFavorites);
    this.saveFavorites(updatedFavorites);
  }

  removeAllFavorites(): void {
    this.favoritesSignal.set([]);
    this.saveFavorites([]);
  }

  characterIsFavorite(id: number): boolean {
    return this.favoritesSignal().some(p => p.id === id);
  }

  favoritesQuantity(): number {
    return this.favoritesQuantitySignal();
  }

  private saveFavorites(favorites: Character[]): void {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  private loadFavorites(): Character[] {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }
}
