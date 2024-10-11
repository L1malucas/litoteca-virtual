import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
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
import { HomeComponent } from "./modules/main/home/home.component";
import { ConsultaRegiaoComponent } from "./modules/main/consulta-regiao/consulta-regiao.component";
import { ConsultarRegiaoFiltroComponent } from "./modules/main/consultar-regiao-filtro/consultar-regiao-filtro.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConsultaRegiaoComponent,
    ConsultarRegiaoFiltroComponent,
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
