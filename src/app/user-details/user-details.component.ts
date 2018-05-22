import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private userId: any;
  private show = false;
  private user: any = {};

  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.httpService.get('/user/get?id=' + this.userId).subscribe((response: any) => {
      if (response.success) {
        this.user = response.response;
        this.show = true;
      }
    })
  }

}
