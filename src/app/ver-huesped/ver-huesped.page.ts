import { Component, OnInit } from '@angular/core';
import { Huesped } from '../models/huesped';
import { HuespedService } from '../services/huesped.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-huesped',
  templateUrl: './ver-huesped.page.html',
  styleUrls: ['./ver-huesped.page.scss'],
})
export class VerHuespedPage implements OnInit {
  public huesped: Huesped;

  constructor(
    private huespedService: HuespedService,
    private activatedRouteService: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRouteService.queryParams.subscribe((params) => {
      this.huesped = this.huespedService.getHuespedToken(params.token);
    });
  }
}
