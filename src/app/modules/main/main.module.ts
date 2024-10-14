import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";

import { CoreModule } from "../../core/core.module";
import { AuthGuard } from "src/app/core/guards/auth-guard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "../../shared/components/components.module";
import { MainRoutingModule } from "./main.routing.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MainRoutingModule,
  ],
  providers: [AuthGuard, provideNgxMask()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule {}
