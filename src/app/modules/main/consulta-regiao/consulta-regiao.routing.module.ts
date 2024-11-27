import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConsultaRegiaoComponent } from "./consulta-regiao.component";

const ConsultaRegiaoRoutes: Routes = [
  {
    path: "",
    component: ConsultaRegiaoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ConsultaRegiaoRoutes)],
  exports: [RouterModule],
})
export class ConsultaRegiaoRoutingModule {}
