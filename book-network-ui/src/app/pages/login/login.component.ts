import {Component, OnInit} from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {AuthenticationResponse} from "../../services/models/authentication-response";
import {TokenService} from "../../services/token/token.service";
import {KeycloakService} from "../../services/keycloak/keycloak.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  //authRequest: AuthenticationRequest = {email: '', password: ''};
  //errorMsg: Array<string> = [];

  constructor(
    private keycloakService: KeycloakService
  ) {}

  async ngOnInit() {
    await this.keycloakService.init();
    await this.keycloakService.login();
  }


  /*login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res: AuthenticationResponse): void => {
        // save the token and navigate in path 'books'
        this.tokenService.token = res.token as string;  // we cast to a string because the token can be undefined
        this.router.navigate(['books']);
      },
      error: (err): void  => {
        console.log(err);
        if (err.error.validationErrors){
          this.errorMsg = err.error.validationErrors;

        }else {
          this.errorMsg.push(err.error.error);
        }
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }*/

}
