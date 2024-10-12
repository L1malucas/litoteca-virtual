import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConsultarRegiaoFiltroComponent } from "./consultar-regiao-filtro.component";

describe("ConsultarRegiaoFiltroComponent", () => {
  let component: ConsultarRegiaoFiltroComponent;
  let fixture: ComponentFixture<ConsultarRegiaoFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarRegiaoFiltroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarRegiaoFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
