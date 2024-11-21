import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";
import { ComponentsModule } from "@components/components.module";
import { ToastComponent } from "@components/toast/toast.component";
import { ToastrModule } from "ngx-toastr";
import { CoreModule } from "./core/core.module";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { AuthService } from "@services/system/auth.service";
import { ConfigService } from "@config/config.service";
import { environment } from "src/environments/environment";
import { CustomMatPaginatorIntl } from "@components/pagination/CustonPaginatiorConfiguration";
import {
  provideNgxWebstorage,
  withLocalStorage,
  withNgxWebstorageConfig,
  withSessionStorage,
} from "ngx-webstorage";
import { HttpsRequestInterceptor } from "@services/_interceptor";
import { LoadingInterceptor } from "@components/loading/loading.interceptor";
import { ConfirmRegisterComponent } from "@modules/login/confirm-register/confirm-register.component";
import { LoginPageComponent } from "@modules/login/login-page/login-page.component";
import { RegisterPageComponent } from "@modules/login/register-page/register-page.component";
import { IMAGE_CONFIG } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ConfirmRegisterComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      toastComponent: ToastComponent,
      closeButton: true,
      tapToDismiss: false,
      preventDuplicates: true,
    }),
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
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
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },
    },
    // { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService],
      multi: true,
    },
    provideNgxWebstorage(
      withNgxWebstorageConfig({ separator: ":", caseSensitive: true }),
      withLocalStorage(),
      withSessionStorage(),
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function initConfig(configService: ConfigService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      configService
        .load(environment.CONFIG_FILE)
        .then(() => {
          return resolve({});
        })
        .catch(() => {
          return reject();
        });
    });
  };
}
