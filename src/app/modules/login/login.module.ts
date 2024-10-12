import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CoreModule } from "../../core/core.module";
import { AuthGuard } from "src/app/core/guards/auth-guard";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmRegisterComponent } from "./confirm-register/confirm-register.component";
import { ComponentsModule } from "../../shared/components/components.module";
import { LoginRoutingModule } from "./login.routing.module";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    ConfirmRegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [AuthGuard, provideNgxMask()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule {}
