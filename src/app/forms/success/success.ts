import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-success',
  standalone: true,
  templateUrl: './success.html',
  imports: [
    CommonModule
  ],
  styleUrls: ['./success.scss']
})
export class Success implements OnInit{
  selectedCoordinator: any;

  ngOnInit(): void {
    // Retrieve and parse the selectedCoordinator from localStorage
    const coordinatorJson = localStorage.getItem('selectedCoordinator');
    if (coordinatorJson) {
      this.selectedCoordinator = JSON.parse(coordinatorJson);
    } else {
      this.selectedCoordinator = null;
    }
  }
}
