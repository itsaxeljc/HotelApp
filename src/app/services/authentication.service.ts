import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // Login básico
  public tokens = ['admin','9895257528'];

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  async validarToken(token: string) {
    console.log(this.tokens)
    if (token === this.tokens[0]) {
      await this.router.navigate(['/home']);
    } 
    else if(this.tokens.includes(token)){
      await this.router.navigate(['/tabs']);
    }
    else {
          this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'El token ingresado no es válido',
      buttons: ['OK'],
    });
    await alert.present();
  }

  public borrarToken(token:string){
    this.tokens.forEach((tok,i) => {
      if (tok === token){
        this.tokens.splice(i,1);
        return;
      }
    });
  }
}
