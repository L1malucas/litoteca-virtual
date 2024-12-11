import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./shared/components/error/error.component";
import { LoginPageComponent } from "@modules/login/login-page/login-page.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  // { path: "cadastro", component: RegisterPageComponent },
  // { path: "confirmar-registro", component: ConfirmRegisterComponent },
  {
    path: "",
    loadChildren: () => {
      return import("./modules/main/main.module").then((m) => {
        return m.MainModule;
      });
    },
  },
  { path: "error", component: ErrorComponent },
  { path: "**", redirectTo: "/error", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
