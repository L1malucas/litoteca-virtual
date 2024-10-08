import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { Directives } from "./directives/_directives";
import { MaterialModule } from "./material.module";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [Directives, MaterialModule, ReactiveFormsModule],
  declarations: [Directives],
})
export class CoreModule {}
