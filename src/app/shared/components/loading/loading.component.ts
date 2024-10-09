import { LoadingType } from "../../../common/enums/loading-type";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

import { LoadingService } from "../../../core/services/system/loading.service";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"],
})
export class LoadingComponent implements OnInit, OnChanges {
  loading$!: Observable<string>;
  loadingDiv!: boolean;
  constructor(
    private _cdr: ChangeDetectorRef,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.loading$ = this.loadingService.getLoading().pipe(
      map((loadingType) => {
        this.loadingDiv = loadingType == LoadingType.LOADING ? true : false;
        this._cdr.detectChanges();
        return loadingType.valueOf();
      }),
    );

    this.loading$.subscribe((_res) => {
      this._cdr.detectChanges();
    });
    this._cdr.detectChanges();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this._cdr.detectChanges();
  }
}
