import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FavoritesService } from '../../../core/favorites-service/favorites.service';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-buton.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ToggleButtonComponent {

  //INJEÇÃO DE DEPENDENCIAS----------------------------------------------
  private router: Router = inject(Router);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private favoritesService: FavoritesService = inject(FavoritesService);
  //----------------------------------------------------------------------

  //VARIÁVEIS------------------------------------------------------------
  public favoritosCount = this.favoritesService.favoritesQuantitySignal;
  public isInicio: boolean = true;
  //----------------------------------------------------------------------

  ngOnInit() {
    this.getCurrentRoute();
  }

  toggle(section: string): void {
    if (section === '/') {
      this.isInicio = true;
    } else if (section === '/favoritos') {
      this.isInicio = false;
    }
  }

  getCurrentRoute(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        this.toggle(currentRoute);
        this.cdr.detectChanges();
      }
    });
  }
}
