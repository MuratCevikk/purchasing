
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor( private authService: AuthService, private router: Router) { 

    this.authService.authonticatedUser(localStorage.getItem('token')).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log("Dee" + JSON.stringify(error));
      }
    });

  }



  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


}
