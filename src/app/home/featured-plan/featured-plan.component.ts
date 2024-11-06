import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-featured-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-plan.component.html',
  styleUrls: ['./featured-plan.component.css']
})
export class FeaturedPlanComponent implements OnInit {

  recentlyAddedWorkspaces!: any[];

  constructor(private workspaceService: WorkspaceService) { }

  ngOnInit(): void {
    this.getWorkspaces();
  }

  getWorkspaces(): void {
    this.workspaceService.getRecentlyAddedWorkspaces().subscribe(data => {
      let count = 1;
      this.recentlyAddedWorkspaces = data.map((workspace:any) => {
        const imageUrl = `https://isimage.gumlet.io/1_Instaspaces_${workspace.spaceId}.jpg?trim=60&bg=ff6667&pad=1,1,1,1&mode=crop&width=400&height=280&format=auto&text=© Instaspaces&text_font_size=12px&text_position=bottomleft&text_padding=12px&text_color=#ff6666`;
        const fallbackImageUrl = `https://instaspaceweb.s3.ap-southeast-1.amazonaws.com/www-image/x${count}_instaspaces_00001.jpg`;
        count++;
        return { ...workspace, imageUrl, fallbackImageUrl };
      });
    });
  }

  handleImageError(event:any, workspace:any): void {
    workspace.imageUrl = workspace.fallbackImageUrl;
    event.target.src = workspace.fallbackImageUrl;
  }
}
