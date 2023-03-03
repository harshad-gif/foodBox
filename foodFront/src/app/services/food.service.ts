import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../model/food.model';
import { OrderDetails } from '../model/orderDetails.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {



  constructor(private http:HttpClient) { }

  public addFoodDetails(food:FormData){
   return this.http.post<Food>("http://localhost:8080/addFood",food)
  }

  public getAllFoodDetails(foodCategory:string){
    return this.http.get<Food[]>("http://localhost:8080/getAllFood/"+foodCategory)
  }

  public deleteFood(foodId:number){
    return this.http.delete<any>("http://localhost:8080/deleteFood/"+foodId)
  }

  public getFoodId(foodId:number){
    return this.http.get<Food>("http://localhost:8080/getFoodId/"+foodId)
  }

  
  public addToCart(foodId:number){
    return this.http.get("http://localhost:8080/addCart/"+foodId)
   }

   public getAllCart(){
    return this.http.get("http://localhost:8080/getCartDetails")
   }

   deleteCart(cartId:number){
    return this.http.delete("http://localhost:8080/deleteCart/"+cartId)
   }

   public getFoodDetail(isSingleProduct:any, foodId:any){

    return this.http.get<Food[]>("http://localhost:8080/getFoodDetail/"+isSingleProduct+"/"+foodId)
    
  }

  public placeOrder(orderDetails:OrderDetails){
    return this.http.post("http://localhost:8080/placeOrder/",orderDetails)
  }


  public createTransaction(amount:number){
    return this.http.get("http://localhost:8080/createTransaction/"+amount)
  }
    
}
