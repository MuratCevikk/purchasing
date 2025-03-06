import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private baseUrl = 'https://dummyjson.com/auth';

  constructor(  private router:Router, private httpClient:HttpClient ) {  }


authonticatedUser(credentials: any):Observable<any>{//Oturumu açık olan kullanıcının bilgilerini getirir
  return   this.httpClient.get(`${this.baseUrl}/user/me`,credentials)

 }


  logIN(credentials: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, credentials)
  }



isAuthenticated(){

  const token:string | null = localStorage.getItem('token');

  if (!token){
  this.router.navigate(['/login']);
    return false;
   }
   else { return true;  }

}







}
