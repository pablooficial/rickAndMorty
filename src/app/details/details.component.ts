import { Component, inject, OnInit } from '@angular/core';
import { CharacterDetailComponent } from '../components/character-detail/character-detail.component';
import { ApiService } from '../core/api-service/api.service';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../shared/models/characters-model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  standalone: true,
  imports: [CharacterDetailComponent],
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  //INJEÇÃO DE DEPENDÊNCIAS----------------------------------------------
  private apiService: ApiService = inject(ApiService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  //----------------------------------------------------------------------

  //VARIÁVEIS------------------------------------------------------------
  public id: number = 0;
  public character!: Character;
  page: number = 1;
  //----------------------------------------------------------------------

  ngOnInit(): void {
    this.getCharacterDetails();
  }

  getCharacterDetails() {
    this.id = this.route.snapshot.params['id']
    this.apiService.getById(this.id).subscribe({
      next: (res: Character) => {
        this.character = res;
        if(this.character.type == "") {
          this.character.type = "unknown"
        }
      }
    })
  }

}
