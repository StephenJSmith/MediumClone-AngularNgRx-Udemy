import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { UtilsService } from "../../services/utils.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
})
export class PaginationComponent implements OnInit {
  @Input() total = 0
  @Input() limit = 20
  @Input() url = ''
  @Input() currentPage = 1

  pagesCount = 1
  pages: number[] = []

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total / this.limit)
    this.pages = this.pagesCount
      ? this.utilsService.range(1, this.pagesCount)
      : []
  }
}