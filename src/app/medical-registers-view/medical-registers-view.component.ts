import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medical-registers-view',
  templateUrl: './medical-registers-view.component.html',
  styleUrls: ['./medical-registers-view.component.css']
})
export class MedicalRegistersViewComponent implements OnInit {

  private registers: any[];

  constructor() { }

  ngOnInit() {
    this.registers = [
      { id: 1, title: 'register1', type: 'consultation', date: '2018-05-05' },
      { id: 2, title: 'register2', type: 'analysis', date: '2018-05-06' },
      { id: 3, title: 'register3', type: 'self observation', date: '2018-05-07' },
    ];
  }
}

