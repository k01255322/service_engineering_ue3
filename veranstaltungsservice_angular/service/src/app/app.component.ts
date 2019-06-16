import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from './http-service.service';
import {MessageService} from './message.service';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Veranstaltungsservice';

 /**
   * An object representing the user for the login form
   */
  public user: any;


    constructor(private _userService: HttpServiceService, public MessageService:MessageService) { }
 
  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };
  }

  login() {
    this._userService.login({'username': this.user.username, 'password': this.user.password});
  }
 
  refreshToken() {
    this._userService.refreshToken();
  }
 
  logout() {
    this._userService.logout();
  }
    


}





