import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { map, Observable, of } from 'rxjs';
import { Food } from '../model/food.model';
import { FoodService } from './food.service';
import { ImageResolverService } from './image-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class FoodResolverService implements Resolve<Food> {

  constructor(private foodSer:FoodService,private imgSer:ImageResolverService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Food> {
    const id:any = route.paramMap.get("foodId")

    if(id){
        return this.foodSer.getFoodId(id)
        .pipe(
          map(p=>this.imgSer.createImage(p))
        )
    }else{
         return of(this.getFood())
    }
  }

   getFood(){
    return{
      foodId:'',
	    foodName:"",
	    foodCategory:"",
	    foodDescription:"",
	    hotelName:"",
	    foodPrice:0,
	    foodDiscountPrice:0,
      foodImage:[],
	    active:1
    }
  }
  
}
