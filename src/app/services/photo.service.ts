import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { LoadingController } from '@ionic/angular';
import { HuespedService } from '../services/huesped.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photo: string;
  public pic: any;
  public photoURL: string;

  constructor(private storage: AngularFireStorage, private loading: LoadingController, private huespedService: HuespedService) { }

  public async takePicture(token: string) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      quality: 60,
      allowEditing: true,
      webUseInput: true,
      promptLabelHeader: "Toma tu mejor foto"
    });

    this.photo = await capturedPhoto.webPath;
    this.pic = await capturedPhoto.base64String;
    this.photoURL = await this.uploadPhoto(this.pic, token);
  }

  public async uploadPhoto(data: any, token: string){
    const loading = await this.loading.create({
      message: 'Subiendo foto...'
    });
    await loading.present();

    const storageRef = this.storage.ref('images/'+token);
    try{
      const snapshot = await storageRef.putString(data, 'base64',{
        contentType: 'image/jpeg'
      })
      const photoUrl = await snapshot.ref.getDownloadURL();
      await loading.dismiss();
      this.huespedService.img = photoUrl;
      return photoUrl;
    } catch (e) {
      console.error(e);
    }

  }
}
