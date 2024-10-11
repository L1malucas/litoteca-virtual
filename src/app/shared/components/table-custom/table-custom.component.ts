import { Component, Input } from "@angular/core";
interface Project {
  id: number;
  name: string;
  alvo: string;
  furo: string;
}
@Component({
  selector: "app-table-custom",
  templateUrl: "./table-custom.component.html",
  styleUrl: "./table-custom.component.scss",
})
export class TableCustomComponent {
  @Input() region: string = "";
  @Input() projects: Project[] = [];

  selectedPavilhao: number = 1;
  searchTerm: string = "";
  filteredProjects: Project[] = [];

  ngOnInit() {
    this.filterProjects();
  }

  selectPavilhao(pavilhao: number) {
    this.selectedPavilhao = pavilhao;
    this.filterProjects();
  }

  filterProjects() {
    this.filteredProjects = this.projects.filter((project) => {
      return project.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
}
