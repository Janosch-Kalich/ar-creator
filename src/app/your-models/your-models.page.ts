import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-your-models',
  templateUrl: './your-models.page.html',
  styleUrls: ['./your-models.page.scss'],
})
export class YourModelsPage implements OnInit {
  models: any = {};
  keys: string[] = [];

  constructor(private http: HttpClient, private alertcontroller: AlertController, private toastcontroller: ToastController, private router: Router) { }

  async ngOnInit() {
    this.keys = await (await Storage.keys()).keys;
    this.keys.forEach(async key => {
      this.models[key] = await (await Storage.get({ key: key })).value;
      console.log(key, this.models[key]);
    });
  }

  options(key) {
    this.alertcontroller.create({
      header: this.models[key].split("/")[this.models[key].split("/").length - 1],
      cssClass: "alert",
      id: "your-models-alert",
      buttons: [
        {
          text: "Cancel",
          cssClass: ["primary-alert-button", "cancel"]
        },
        {
          text: "Create Code",
          cssClass: ["primary-alert-button", "cancel"],
          handler: () => {
            this.router.navigate(["create"], { queryParams: { url: this.models[key] } });
          }
        },
        {
          text: "Delete",
          cssClass: ["delete", "right-alert-button"],
          handler: () => { this.delete(key) }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  delete(key) {
    const headers = new HttpHeaders();
    headers.append("Content-type", "application/json");
    this.http.post("https://janosch-kalich.com:9037/delete", { key: key, model: this.models[key] } , { "headers": headers }).toPromise().then(async res => {
      console.log(res);
      if(res["code"] == 0) {
        delete this.models[key];
        this.keys.splice(this.keys.indexOf(key), 1);
        console.log(key);
        await Storage.remove({ key });
      }
      else {
        this.toastcontroller.create({ message: "Couldn't delete" });
      }
    });
  }

  back() {
    this.router.navigate(["/"]);
  }
}
