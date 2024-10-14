import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./shared/components/error/error.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => {
      return import("./modules/login/login.module").then((m) => {
        return m.LoginModule;
      });
    },
  },
  {
    path: "",
    loadChildren: () => {
      return import("./modules/main/main.module").then((m) => {
        return m.MainModule;
      });
    },
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "error", component: ErrorComponent },
  { path: "**", redirectTo: "/error", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
