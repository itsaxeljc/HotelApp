import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public alertHeader: string;
  public token: string;

  constructor(private router: Router, private alertController: AlertController, private translateService: TranslateService, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.token = this.router.getCurrentNavigation().extras.state.token;
        window.localStorage.setItem('token',this.token);
      }
    });

  }

  ngOnInit() {
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
  }

  changeLang(lang: string) {
    this.translateService.use(lang);
  }

  async languageSelector(){
    let headerT = this.translateService.get('SELECT').subscribe((res: string) => {
      return res;
  });
    const alert = await this.alertController.create({
      header: "Seleccione un idioma",
      inputs: [
        {
          label: 'Español',
          type: 'radio',
          value: 'spanish'
        },
        {
          label: 'English',
          type: 'radio',
          value: 'english'
        },
        {
          label: 'Français',
          type: 'radio',
          value: 'french'
        }
      ],
      buttons: [{
        text: 'OK',
        handler: (alertData) =>{
          this.changeLang(alertData);
        }
      }]
    });

    await alert.present();
  }
}
