import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  showMsg:boolean = false

  constructor(private userSer:UserService,private router:Router){}

  ngOnInit(): void {
      
  }

  register(registeForm:any){
    this.userSer.register(registeForm.value).subscribe(
      (res)=>{
        console.log(res)
        this.showMsg = true
        this.router.navigate(['/login'])
   
      },
      (error)=>{
        console.log(error)
      }
    )
  }
}
