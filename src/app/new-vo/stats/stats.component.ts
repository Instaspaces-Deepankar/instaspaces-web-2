import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  stats = [
    { value: 12760, label: 'Virtual Office Registrations', currentValue: 0 },
    { value: 47, label: 'Industries served', currentValue: 0 },
    { value: 143, label: "Cities Present in 28 States & 9 UT's", currentValue: 0 },
    { value: 97.1, label: 'VPOB GST Approval Rate in last 3 Months', currentValue: 0 },
    { value: 2166, label: 'GST/MCA Queries Solved', currentValue: 0 },
    { value: 4.9, label: 'Google Maps Rating by 800+ Clients', currentValue: 0 },
  ];

  ngOnInit(): void {
    this.animateNumbers();
  }

  animateNumbers(): void {
    this.stats.forEach((stat) => {
      const increment = stat.value / 100; // Adjust "100" for animation duration
      const interval = setInterval(() => {
        if (stat.currentValue < stat.value) {
          stat.currentValue = +(stat.currentValue + increment).toFixed(2); // Ensure precision
          if (stat.currentValue >= stat.value) {
            stat.currentValue = stat.value; // Prevent exceeding target value
          }
        } else {
          clearInterval(interval);
        }
      }, 20); // Adjust speed for smoother or faster animation
    });
  }

  formatNumber(value: number): string {
    return value % 1 === 0 ? value.toString() : value.toFixed(1);
  }
}
