import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CoreModule } from "../../core/core.module";
import { LoadingInterceptor } from "@components/loading/loading.interceptor";
import { HttpsRequestInterceptor } from "@services/_interceptor";
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
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    provideNgxMask(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule {}
