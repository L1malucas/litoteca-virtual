import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";

import { AuthGuard } from "src/app/core/guards/auth-guard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "@components/components.module";
import { CoreModule } from "src/app/core/core.module";
import { ConsultarRegiaoFiltroComponent } from "./consultar-regiao-filtro.component";
import { ConsultarRegiaoFiltroRoutingModule } from "./consultar-regiao-filtro.routing.module";

@NgModule({
  declarations: [ConsultarRegiaoFiltroComponent],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ConsultarRegiaoFiltroRoutingModule,
  ],
  providers: [AuthGuard, provideNgxMask()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConsultarRegiaoFiltroModule {}
