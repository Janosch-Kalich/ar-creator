import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage {
  result: string;
  murl: string;
  bcv: string;
  loading: boolean = false;

  constructor(private http: HttpClient) { }

  create() {
    this.loading = true;
      this.http.post("https://janosch-kalich.com:1938/create", { url: this.murl, barcodeval: this.bcv }).toPromise().then(res => {
        this.loading = false;
        console.log(res);
        this.result = res["img"];
      });
  }
}
