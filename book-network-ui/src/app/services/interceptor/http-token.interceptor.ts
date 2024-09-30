import {HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {Inject} from "@angular/core";
import {KeycloakService} from "../keycloak/keycloak.service";


export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {

  //const token: string = localStorage.getItem('token') as string;
  const keycloakService = Inject(KeycloakService);
  const token = keycloakService.keycloak.token;


  if (!req.url.includes('/authenticate') && !req.url.includes('/register') && !req.url.includes('/activate-account')) {
    if (token) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      });
      return next(authReq);
    }

  }
  return next(req);
};
