import { ConfigService } from "./config.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HelpConfig {
  constructor(private configService: ConfigService) {}

  public get BASE_API(): string | null {
    return this.configService.getUrl("LITOTECA", "URL");
  }

  public get BOX_ENDPOINT(): string {
    return this.configService.getEndPoint("LITOTECA", "BOX");
  }

  public get RECORDS_ENDPOINT(): string {
    return this.configService.getEndPoint("LITOTECA", "RECORDS");
  }
}
