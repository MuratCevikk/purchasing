import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {

  let newReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))  
  });

  return next(newReq);


};
