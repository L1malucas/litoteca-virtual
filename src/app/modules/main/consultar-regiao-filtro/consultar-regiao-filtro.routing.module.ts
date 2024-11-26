import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConsultarRegiaoFiltroComponent } from "./consultar-regiao-filtro.component";
import { ProjetosPorMunicipioIdResolver } from "@services/resolvers/projetos-por-municipio-id.resolver";

const consultarRegiaoFiltroRoutes: Routes = [
  {
    path: "",
    component: ConsultarRegiaoFiltroComponent,
    resolve: { projetos: ProjetosPorMunicipioIdResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(consultarRegiaoFiltroRoutes)],
  exports: [RouterModule],
})
export class ConsultarRegiaoFiltroRoutingModule {}
