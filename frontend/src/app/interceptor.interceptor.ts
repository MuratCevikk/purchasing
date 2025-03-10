import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {

  let headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  });

  let newReq = req.clone({ headers });

  return next(newReq);


};
