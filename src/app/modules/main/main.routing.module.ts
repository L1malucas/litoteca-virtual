import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth-guard";

const MainRoutes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: () => {
      return import("./home/home.module").then((m) => {
        return m.HomeModule;
      });
    },
    canActivate: [AuthGuard],
  },
  {
    path: "consultar-regiao",
    loadChildren: () => {
      return import("./consulta-regiao/consulta-regiao.module").then((m) => {
        return m.ConsultaRegiaoModule;
      });
    },
    canActivate: [AuthGuard],
  },
  {
    path: "consultar-regiao-filtro",
    loadChildren: () => {
      return import(
        "./consultar-regiao-filtro/consultar-regiao-filtro.module"
      ).then((m) => {
        return m.ConsultarRegiaoFiltroModule;
      });
    },
    canActivate: [AuthGuard],
  },
  {
    path: "galeria",
    loadChildren: () => {
      return import("./gallery/gallery.module").then((m) => {
        return m.GalleryModule;
      });
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(MainRoutes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
