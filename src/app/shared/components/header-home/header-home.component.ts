import { Component, Input } from "@angular/core";
import { Token } from "@models/system/token.model";
import { UserService } from "@services/system/user.service";
import { jwtDecode } from "jwt-decode";

@Component({
  selector: "app-header-home",
  templateUrl: "./header-home.component.html",
  styleUrl: "./header-home.component.scss",
})
export class HeaderHomeComponent {
  @Input() styleHeader: { [klass: string]: any } = {};
  show: boolean = false;

  token: Token | null = null;
  emailUser!: string;

  user = {
    name: "",
    info: "",
    email: "",
    image: "assets/images/jpeg/image_placeholder.jpg",
  };

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.getUserInfoLogged();
    this.getUserInfo(this.emailUser);
  }

  getUserInfoLogged() {
    const tokenString = localStorage.getItem("ngx-webstorage:STORAGE_AUTH");
    if (tokenString) {
      try {
        this.token = JSON.parse(tokenString) as Token;
        if (this.token?.access_token) {
          const decodedToken: any = jwtDecode(this.token.access_token);
          this.emailUser = decodedToken.email;
        }
      } catch (error) {
        console.error("Erro ao analisar o token do localStorage:", error);
        this.token = null;
      }
    } else {
      console.warn("Token não encontrado no localStorage.");
      this.token = null;
    }
  }

  getUserInfo(email: string) {
    this._userService.getUserByEmail(email).subscribe((user: any) => {
      this.user.name = user[0].nome + " " + user[0].sobrenome;
      this.user.info = user[0].profissao;
      this.user.email = user[0].email;
      this.user.image =
        user[0].fotoReferenceFtp != ""
          ? user[0].fotoReferenceFtp
          : "./assets/images/jpeg/image_placeholder.jpg";
    });
  }

  openProfile() {
    this.show = !this.show;
  }
}
