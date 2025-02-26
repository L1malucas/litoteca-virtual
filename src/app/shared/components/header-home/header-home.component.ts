import { Component, Input } from "@angular/core";
import { HelpConfig } from "@config/help-config";
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
    id: "",
  };

  constructor(
    private _userService: UserService,
    private _helpConfig: HelpConfig,
  ) {}

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
      } catch {
        this.token = null;
      }
    } else {
      this.token = null;
    }
  }

  getUserInfo(email: string) {
    this._userService.getUserByEmail(email).subscribe((user: any) => {
      this.user.id = user.data[0].id;
      this.user.name = `${user.data[0].nome} ${user.data[0].sobrenome.split(" ").slice(-1)[0]}`;
      this.user.info = user.data[0].profissao;
      this.user.email = user.data[0].email;
      this.user.image =
        user.data[0].fotoReferenceFtp != ""
          ? `${this._helpConfig.FTP_URL}${user.data[0].fotoReferenceFtp.replace(/\\/g, "/")}`
          : "./assets/img/image_placeholder.jpg";
    });
  }

  openProfile() {
    this.show = !this.show;
  }
}
