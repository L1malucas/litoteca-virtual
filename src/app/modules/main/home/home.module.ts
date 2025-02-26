import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { NgOptimizedImage } from "@angular/common";
import { AuthGuard } from "src/app/core/guards/auth-guard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home.component";
import { ComponentsModule } from "@components/components.module";
import { CoreModule } from "src/app/core/core.module";
import { HomeRoutingModule } from "./home.routing.module";
import { HomeMapComponent } from "./_components/home-map/home-map.component";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    CoreModule,
    FormsModule,
    HomeMapComponent,
    NgOptimizedImage,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    HomeRoutingModule,
  ],
  providers: [AuthGuard, provideNgxMask()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
