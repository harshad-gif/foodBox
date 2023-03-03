import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Food } from '../model/food.model';
import { FoodService } from '../services/food.service';
import { ImageResolverService } from '../services/image-resolver.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  foodDetails:any
  foodCategory:string='all'

  constructor(
   private foodSer:FoodService,
   private router:Router,
   private userAuth:UserAuthService,
   private imgSer:ImageResolverService
  ){}

  ngOnInit(): void {
      this.getAllFood()
  }

  getAllFood(){
    this.foodSer.getAllFoodDetails(this.foodCategory)
    .pipe(
      map((x:Food[],i)=>x.map((food:Food)=>this.imgSer.createImage(food)))
    )
      .subscribe(
        (res:Food[])=>{
          console.log(res)
          this.foodDetails = res
        }
      )
    
  }

  delete(foodId:any){
    this.foodSer.deleteFood(foodId).subscribe(
      (res)=>{
        console.log(res)
        alert("Deleted Successfully....")
        this.getAllFood()

      },
      (error)=>{
        console.log(error)
      }
    )

  }

  editFood(foodId:number){
    this.router.navigate(["/add",{foodId:foodId}])
  }

  logout(){
    this.userAuth.clear()
    this.router.navigateByUrl("/login")
  }
}
