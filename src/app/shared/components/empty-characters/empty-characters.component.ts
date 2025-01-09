import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empty-characters',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './empty-characters.component.html',
  styleUrl: './empty-characters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyCharactersComponent {
  @Input() origin: string = '';
}
