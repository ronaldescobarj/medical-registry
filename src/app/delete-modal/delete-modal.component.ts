import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  constructor() { }

  @Input() type: any;
  @ViewChild('modal') modal: BsModalComponent;
  ngOnInit() {
  }

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }
}
