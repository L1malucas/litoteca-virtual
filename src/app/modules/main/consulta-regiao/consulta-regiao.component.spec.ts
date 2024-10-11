import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConsultaRegiaoComponent } from "./consulta-regiao.component";

describe("ConsultaRegiaoComponent", () => {
  let component: ConsultaRegiaoComponent;
  let fixture: ComponentFixture<ConsultaRegiaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultaRegiaoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaRegiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
