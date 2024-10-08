import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { COMPONENTS } from "./_components";
import { CoreModule } from "src/app/core/core.module";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { LoadingComponent } from "./loading/loading.component";

@NgModule({
  declarations: [COMPONENTS, LoadingComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CoreModule,
    MatInputModule,
  ],
  exports: [COMPONENTS],
})
export class ComponentsModule {}
