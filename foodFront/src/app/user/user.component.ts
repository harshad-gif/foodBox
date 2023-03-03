import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Food } from '../model/food.model';
import { FoodService } from '../services/food.service';
import { ImageResolverService } from '../services/image-resolver.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  productDetails:any=null
  foodCategory:string='All'
  
  constructor(
    private foodSer:FoodService,
    private imgSer:ImageResolverService,
    private router:Router
  ){}

  ngOnInit(): void {
     this.getAllFood(this.foodCategory)
  }

  getAllFood(categoryPara:string){
    this.foodSer.getAllFoodDetails(categoryPara)
    .pipe(
      map((x:Food[],i)=>x.map((food:Food)=>this.imgSer.createImage(food)))
    )
      .subscribe(
        (res:Food[])=>{
          console.log(res)
          this.productDetails = res
        }
      )
    
  }


  addCart(foodId:number){
    this.foodSer.addToCart(foodId)
    .subscribe(
      (res)=>{
        console.log(res)
        
        this.router.navigate(['/cart'])
      },
      (error)=>{
          console.log(error)
      }
    )
  }


  viewFood(foodId:number){
    this.router.navigate(["/view",{foodId:foodId}])
  }
}
