import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  showMsg:boolean = false

  constructor(
    private userSer:UserService,
    private userAuth:UserAuthService,
    private router: Router
  ){}

  ngOnInit():void{

  }

  login(loginForm:NgForm){
    this.userSer.login(loginForm.value)
    .subscribe(
      (res:any)=>{
        this.userAuth.setRoles(res.user.role);
        this.userAuth.setToken(res.jwtToken);

        const role = res.user.role[0].roleName;
        if (role === "Admin") {
          this.router.navigate(['/admin']);
          alert("Admin Login Successfully")
        } else {
          this.router.navigate(['/user']);
          alert("User Login Successfully")
        }
       
        console.log(res)
      },
      (error)=>{
        console.log(error)
      }
    )
  }
}
