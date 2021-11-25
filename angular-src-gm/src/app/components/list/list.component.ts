import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void { //ngOninit 페이지가 로드될때 무조건 해야되는것 (사용자액션x)
    this.authService.getList().subscribe((users) => {
      this.users = users;
    });
  }

}
