import { Component, OnInit } from '@angular/core';
import { AuthService } from '../firebase-auth-ui/auth.service';

@Component({
  selector: 'app-admin-module',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignout() {
    console.log("logging out")
    this.authService.signOut();
  }
}
