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

  public get ALVO_ENDPOINT(): string {
    return this.configService.getEndPoint("LITOTECA", "ALVO");
  }

  public get ARQUIVO_ENDPOINT(): string {
    return this.configService.getEndPoint("LITOTECA", "ARQUIVO");
  }

  public get CAIXA_ENDPOINT(): string {
    return this.configService.getEndPoint("LITOTECA", "CAIXA");
  }

  public get CANDIDATO_ENDPOINT(): string {
    return this.configService.getEndPoint("LITOTECA", "CANDIDATO");
  }

  public get COLETA_ENDPOINT(): string {
    return this.configService.getEndPoint("LITOTECA", "COLETA");
  }

  public get FTP_ENDPOINT(): string {
    return this.configService.getEndPoint("LITOTECA", "FTP");
  }

  public get FURO_ENDPOINT(): string {
    return this.configService.getEndPoint("LITOTECA", "FURO");
  }

  public get LOG_ENDPOINT(): string {
    return this.configService.getEndPoint("LITOTECA", "LOG");
  }

  public get MUNICIPIO_ENDPOINT(): string {
    return this.configService.getEndPoint("LITOTECA", "MUNICIPIO");
  }

  public get OPERADOR_ENDPOINT(): string {
    return this.configService.getEndPoint("LITOTECA", "OPERADOR");
  }

  public get PONTOATENDIMENTO_ENDPOINT(): string {
    return this.configService.getEndPoint("LITOTECA", "PONTOATENDIMENTO");
  }

  public get POSTO_ENDPOINT(): string {
    return this.configService.getEndPoint("LITOTECA", "POSTO");
  }

  public get PROJETO_ENDPOINT(): string {
    return this.configService.getEndPoint("LITOTECA", "PROJETO");
  }

  public get REGIAO_ENDPOINT(): string {
    return this.configService.getEndPoint("LITOTECA", "REGIAO");
  }

  public get USUARIO_ENDPOINT(): string {
    return this.configService.getEndPoint("LITOTECA", "USUARIO");
  }
}
