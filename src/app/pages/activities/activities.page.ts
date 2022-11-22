import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Recommendation } from 'src/app/models/recommendation';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {

  public activities: Activity[] = [];
  public recommendations: Recommendation[] = [];
  public telephones: Recommendation[] = [];

  constructor() { 
    this.activities = [
      {
        url: 'https://gentenayarit.com/wp-content/uploads/2017/08/Captura-de-pantalla-2017-08-04-a-las-0.10.34.png',
        title: 'T-BOAT',
        content: 'BOAT'
      },
      {
        url: 'https://innovacioneconomica.com/wp-content/uploads/2020/11/man-on-boat-angliing-with-fishing-rod.jpg',
        title: 'T-FISHING',
        content: 'FISHING'
      },
      {
        url: 'http://notivallarta.com/wp-content/uploads/2014/01/URRACA.1.jpg',
        title: 'T-BIRDS',
        content: 'BIRDS'
      },
      {
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/06/8b/94/94/lago-escondido.jpg',
        title: 'T-KAYAK',
        content: 'KAYAK'
      },
      {
        url: 'https://www.mysamoa.com.au/wp-content/uploads/sites/16/2018/08/GettyImages-176702766.jpg',
        title: 'T-SNORKEL',
        content: 'SNORKEL'
      }
    ];

    this.recommendations = [
      {
        url: 'https://antojandoando.com/wp-content/uploads/2016/03/chich-pesc-close-pq.jpg',
        title: 'CH'
      },
      {
        url: 'https://fastly.4sqi.net/img/general/600x600/390606622_Dlsqy8jRLWpThgKK3ArBnbWl5Lk1WBlYDRs-4n-qzAU.jpg',
        title: 'VI'
      },
      {
        url: 'https://vallartalifestyles.com/wp-content/uploads/2020/01/samao_4-1.jpg',
        title: 'EXP'
      },
      {
        url: 'https://mexicotravelchannel.com.mx/wp-content/uploads/2021/08/santa-maria-del-oro.jpg',
        title: 'LE'
      }
    ]

    this.telephones = [
      {
        url: 'https://medlineplus.gov/images/EmergencyMedicalServices_share.jpg',
        title: 'EM'
      },
      {
        url: 'https://i0.wp.com/seguridad.guanajuato.gob.mx/wp-content/uploads/2021/03/ProteccionCivilGTO.jpg?fit=1080%2C607&ssl=1',
        title: 'CIV'
      },
      {
        url: 'https://www.gaceta.unam.mx/wp-content/uploads/2019/10/dia_bombero.jpg',
        title: 'FIRE'
      },
      {
        url: 'https://www.gob.mx/cms/uploads/article/main_image/5461/ANGELES-VERDES-PACHUCA_0089.jpg',
        title: 'ROAD'
      },
      {
        url: 'https://www.gob.mx/cms/uploads/article/main_image/117994/WhatsApp_Image_2022-02-18_at_11.46.53.jpeg',
        title: 'RED'
      }
    ];
  }

  ngOnInit() {
  }

}
