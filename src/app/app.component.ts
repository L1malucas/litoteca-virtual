import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "litoteca-virtual";

  async oi() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  }
}
