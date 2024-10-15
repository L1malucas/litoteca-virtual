import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConsultarRegiaoFiltroComponent } from "./consultar-regiao-filtro.component";

const consultarRegiaoFiltroRoutes: Routes = [
  { path: "", component: ConsultarRegiaoFiltroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(consultarRegiaoFiltroRoutes)],
  exports: [RouterModule],
})
export class ConsultarRegiaoFiltroRoutingModule {}
