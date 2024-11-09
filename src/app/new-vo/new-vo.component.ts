import { Component } from '@angular/core';
import { VoHeroComponent } from "./vo-hero/vo-hero.component";
import { VoOfferingsComponent } from "./vo-offerings/vo-offerings.component";

@Component({
  selector: 'app-new-vo',
  standalone: true,
  imports: [VoHeroComponent, VoOfferingsComponent],
  templateUrl: './new-vo.component.html',
  styleUrl: './new-vo.component.scss'
})
export class NewVoComponent {

}
