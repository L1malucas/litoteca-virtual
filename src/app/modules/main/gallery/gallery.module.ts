import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";

import { AuthGuard } from "src/app/core/guards/auth-guard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "@components/components.module";
import { CoreModule } from "src/app/core/core.module";
import { GalleryComponent } from "./gallery.component";
import { GalleryRoutingModule } from "./gallery.routing.module";
import { GalleryCardComponent } from "./components/gallery-card/gallery-card.component";
import { SectionsCardComponent } from "./components/sections-card/sections-card.component";
import { SecaoModule } from "../secao/secao.module";

@NgModule({
  declarations: [GalleryComponent, GalleryCardComponent, SectionsCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    GalleryRoutingModule,
    SecaoModule,
  ],
  providers: [AuthGuard, provideNgxMask()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GalleryModule {}
