import { Component, Input } from "@angular/core";

@Component({
  selector: "app-header-home",
  templateUrl: "./header-home.component.html",
  styleUrl: "./header-home.component.scss",
})
export class HeaderHomeComponent {
  @Input() styleHeader: { [klass: string]: any } = {};
  show: boolean = false;
  user!: any;

  constructor() {}

  ngOnInit(): void {
    this.getUserInfoLogged();
  }

  getUserInfoLogged(): void {
    try {
      const user = localStorage.getItem("ngx-webstorage:USER_INFO");
      if (user) {
        const parsedUser = JSON.parse(user);
        this.user = parsedUser;
        return parsedUser;
      } else {
        console.warn("No user information found in localStorage.");
      }
    } catch (error) {
      console.error(
        "Failed to parse user information from localStorage:",
        error,
      );
    }
  }

  openProfile() {
    this.show = !this.show;
  }
}
