import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: 'mc-banner',
  templateUrl: './banner.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BannerComponent {}