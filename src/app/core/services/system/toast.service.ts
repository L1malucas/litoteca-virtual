import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Toast {
  constructor(private toastrService: ToastrService) {}

  success(title = "Sucesso", text = "Solicitação realizada com sucesso.") {
    this.toastrService.success(text, title);
  }

  error(title = "Erro", text = "Não foi possível realizada sua solicitação.") {
    this.toastrService.error(text, title);
  }

  info(title = "Info", text = "Info.") {
    this.toastrService.info(text, title);
  }

  warning(
    title = "Alerta",
    text = "Não foi possível realizada sua solicitação.",
  ) {
    this.toastrService.warning(text, title);
  }
}
