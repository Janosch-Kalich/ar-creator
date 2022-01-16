import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  file: any;
  fileobj: any;
  headers: HttpHeaders = new HttpHeaders('multipart/form-data; boundary="----c90b370e416c9cab2263416494a4ac7c"')
  loading: boolean = false;

  constructor(private http: HttpClient, private alertcontroller: AlertController, private router: Router) { }

  ngOnInit() {
  }

  change(files: FileList) {
    this.fileobj = files.item(0);
  }

  upload() {
    console.log(this.fileobj);
    const formdata: FormData = new FormData();
    formdata.append("model", this.fileobj, this.fileobj.name)
    console.log(formdata.get("model"));
    this.loading = true;
    this.http.post("https://janosch-kalich.com:9037/upload", formdata, { headers: this.headers }).toPromise().then(async res => {
      console.log(res);
      this.loading = false;
      await Storage.set({key: res["key"], value: res["url"]});
      if(res["url"]) {
        this.alertcontroller.create({
          header: this.file.split("\\")[this.file.split("\\").length - 1],
          backdropDismiss: false,
          cssClass: "alert",
          buttons: [
            {
              text: "Create Code",
              cssClass: "primary-alert-button",
              handler: () => {
                this.router.navigate(["create"], { queryParams: { url: res["url"] }});
              }
            },
            {
              text: "My models",
              cssClass: ["primary-alert-button", "right-alert-button"],
              handler: () => { this.router.navigate(["your-models"]) }
            }
          ]
        }).then(alert => {
          alert.present();
        });
      }
    });
  }

  back() {
    this.router.navigate(["/"]);
  }
}
