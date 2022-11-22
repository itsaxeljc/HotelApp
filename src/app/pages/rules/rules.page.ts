import { Component, OnInit } from '@angular/core';
import { Rule } from '../../models/rule';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.page.html',
  styleUrls: ['./rules.page.scss'],
})
export class RulesPage implements OnInit {

  public rules : Rule[];

  constructor() { 
    this.rules=
    [
      {title: 'RT1',descrip: 'R1'},
      {title: 'RT2',descrip: 'R2'},
      {title: 'RT3',descrip: 'R3'},
      {title: 'RT4',descrip: 'R4'},
      {title: 'RT5',descrip: 'R5'},
      {title: 'RT6',descrip: 'R6'},
      {title: 'RT7',descrip: 'R7'}
    ]
  }

  ngOnInit() {
  }

}
