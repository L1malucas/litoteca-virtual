import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SecaoComponent } from "./secao.component";

const secaoRoutes: Routes = [{ path: "", component: SecaoComponent }];

@NgModule({
  imports: [RouterModule.forChild(secaoRoutes)],
  exports: [RouterModule],
})
export class SecaoRoutingModule {}
