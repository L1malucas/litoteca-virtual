import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { COMPONENTS } from "./_components";
import { CoreModule } from "src/app/core/core.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CoreModule,
    MatInputModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
  ],
  providers: [provideNgxMask()],
  exports: [COMPONENTS],
})
export class ComponentsModule {}
