import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DownloadService {
  constructor(private http: HttpClient) {}

  downloadImage(url: string): void {
    this.http.get(url, { responseType: "blob" }).subscribe(
      (blob) => {
        const objectUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = objectUrl;
        a.download = this.extractFileName(url);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
      },
      (error) => {
        console.error("Erro ao baixar a imagem:", error);
      },
    );
  }

  private extractFileName(url: string): string {
    return url.split("/").pop() || "download";
  }
}
