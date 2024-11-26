import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConsultaRegiaoComponent } from "./consulta-regiao.component";
import { MunicipiosPorRegiaoIdResolver } from "@services/resolvers/municipios-por-regiao-id.resolver";

const ConsultaRegiaoRoutes: Routes = [
  {
    path: "",
    component: ConsultaRegiaoComponent,
    resolve: { municipios: MunicipiosPorRegiaoIdResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(ConsultaRegiaoRoutes)],
  exports: [RouterModule],
})
export class ConsultaRegiaoRoutingModule {}
