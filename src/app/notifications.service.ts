import { Injectable } from '@angular/core';

@Injectable()
export class NotificationsService {

  constructor() {
    this.notificationsTest();
  }

  notificationsTest() {
    console.log("entra");
    var now = new Date();
    var millis = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 26, 0, 0);
    var millisTill10 = millis.getTime() - now.getTime();
    if (millisTill10 < 0) {
      millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
    }
    setTimeout(function () { alert("It's 10am!") }, millisTill10);
  }

}
