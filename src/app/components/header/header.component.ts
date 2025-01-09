import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ToggleButtonComponent } from '../../shared/components/toggle-button/toggle-button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ToggleButtonComponent, MatIconModule, RouterModule]
})
export class HeaderComponent {}
