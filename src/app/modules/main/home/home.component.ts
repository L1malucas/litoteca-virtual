import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HelpConfig } from "@config/help-config";
import { RegiaoModel } from "@models/regiao.model";
import { Token } from "@models/system/token.model";
import { UserService } from "@services/system/user.service";
import { jwtDecode } from "jwt-decode";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  regioes: RegiaoModel[] = [];
  token: Token | null = null;
  emailUser: string = "";
  user = this.getDefaultUser();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private helpConfig: HelpConfig,
  ) {}

  ngOnInit(): void {
    this.regioes = this.route.snapshot.data["regioes"] || [];
    this.initializeUser();
  }

  goConsultaRegiao(): void {
    this.router.navigate(["/consultar-regiao"]);
  }

  goConsultaProjeto(): void {
    this.router.navigate(["/consultar-regiao-filtro/"]);
  }

  private initializeUser(): void {
    this.extractUserInfoFromToken();
    if (this.emailUser) {
      this.fetchUserDetails(this.emailUser);
    }
  }

  private extractUserInfoFromToken(): void {
    const tokenString = localStorage.getItem("ngx-webstorage:STORAGE_AUTH");

    if (!tokenString) {
      console.warn("Token não encontrado no localStorage.");
      return;
    }

    try {
      this.token = JSON.parse(tokenString) as Token;
      if (this.token?.access_token) {
        const decodedToken: any = jwtDecode(this.token.access_token);
        this.emailUser = decodedToken.email || "";
      }
    } catch (error) {
      console.error("Erro ao analisar o token do localStorage:", error);
      this.token = null;
    }
  }

  private fetchUserDetails(email: string): void {
    this.userService.getUserByEmail(email).subscribe(
      (response: any) => {
        const userData = response.data?.[0];
        if (userData) {
          this.user = {
            id: userData.id,
            name: `${userData.nome} ${userData.sobrenome.split(" ").slice(-1)[0]}`,
            info: userData.profissao,
            email: userData.email,
            image: userData.fotoReferenceFtp
              ? `${this.helpConfig.FTP_URL}${userData.fotoReferenceFtp.replace(/\\/g, "/")}`
              : "./assets/img/image_placeholder.jpg",
          };
          this.saveUserToLocalStorage(this.user);
        }
      },
      (error) => {
        console.error("Erro ao buscar informações do usuário:", error);
      },
    );
  }

  private saveUserToLocalStorage(user: any): void {
    localStorage.setItem("ngx-webstorage:USER_INFO", JSON.stringify(user));
  }

  private getDefaultUser() {
    return {
      id: "",
      name: "",
      info: "",
      email: "",
      image: "assets/images/jpeg/image_placeholder.jpg",
    };
  }
}
