import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navber',
  templateUrl: './navber.component.html',
  styleUrls: ['./navber.component.scss']
})
export class NavberComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  //ngOnInit : 시작할때 무조건 실행하는 함수
  ngOnInit(): void {

  }




  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('로그아웃 되었습니다.', {
      cssClass: 'alert-success',
      timeout: 3000,
    });
    this.router.navigate(['/login']);
  }

  checkLoggedIn(): boolean {
    return this.authService.loggedIn();
  }
}
