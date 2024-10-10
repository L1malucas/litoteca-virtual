import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { ConfirmRegisterComponent } from "./confirm-register/confirm-register.component";
import { HomeComponent } from "@modules/main/home/home.component";
import { ConsultaRegiaoComponent } from "@modules/main/consulta-regiao/consulta-regiao.component";

const LoginRoutes: Routes = [
  { path: "", component: LoginPageComponent },
  { path: "cadastro", component: RegisterPageComponent },
  { path: "confirmar-registro", component: ConfirmRegisterComponent },
  { path: "home", component: HomeComponent },
  { path: "consultar-regiao", component: ConsultaRegiaoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(LoginRoutes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
