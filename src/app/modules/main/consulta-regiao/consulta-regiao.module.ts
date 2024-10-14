import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";

import { AuthGuard } from "src/app/core/guards/auth-guard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConsultaRegiaoComponent } from "./consulta-regiao.component";
import { ComponentsModule } from "@components/components.module";
import { CoreModule } from "src/app/core/core.module";
import { ConsultaRegiaoRoutingModule } from "./consulta-regiao.routing.module";

@NgModule({
  declarations: [ConsultaRegiaoComponent],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ConsultaRegiaoRoutingModule,
  ],
  exports: [ConsultaRegiaoComponent],
  providers: [AuthGuard, provideNgxMask()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConsultaRegiaoModule {}
