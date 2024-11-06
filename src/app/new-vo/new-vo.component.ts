import { Component } from '@angular/core';
import { VoHeroComponent } from "./vo-hero/vo-hero.component";

@Component({
  selector: 'app-new-vo',
  standalone: true,
  imports: [VoHeroComponent],
  templateUrl: './new-vo.component.html',
  styleUrl: './new-vo.component.scss'
})
export class NewVoComponent {

}
