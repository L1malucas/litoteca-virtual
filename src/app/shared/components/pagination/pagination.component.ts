import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrl: "./pagination.component.scss",
})
export class PaginationComponent {
  @Input() length = 0;
  @Input() pageSize = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];

  @Output() pageChange = new EventEmitter<PageEvent>();

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }
}
