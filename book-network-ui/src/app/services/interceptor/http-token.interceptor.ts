import {HttpHeaders, HttpInterceptorFn} from '@angular/common/http';


export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string = localStorage.getItem('token') as string;


  if (!req.url.includes('/authenticate') && !req.url.includes('/register') && !req.url.includes('/activate-account')) {
    if (token) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      });
      return next(authReq);
    }

  }
  return next(req);
};
