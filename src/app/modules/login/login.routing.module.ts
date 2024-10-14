import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { ConfirmRegisterComponent } from "./confirm-register/confirm-register.component";

const LoginRoutes: Routes = [
  { path: "login", component: LoginPageComponent },
  { path: "cadastro", component: RegisterPageComponent },
  { path: "confirmar-registro", component: ConfirmRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(LoginRoutes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
