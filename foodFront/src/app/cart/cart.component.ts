import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartDetails:any[]=[]
  constructor(
    private foodSer:FoodService,
    private router:Router
  ){}

  ngOnInit(): void {
      this.getAllCart()
  }

  getAllCart(){
    this.foodSer.getAllCart()
    .subscribe(
      (res:any)=>{
        console.log(res)
        this.cartDetails=res
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  deleteCart(cartId:number){
    this.foodSer.deleteCart(cartId)
    .subscribe({
     next:(res)=>{
       console.log(res)
       alert("cart Deleted!..")
       this.getAllCart()
     },
     error:(err)=>{
       console.log(err)
     }
    })
  }

  buy(foodId:number){
    this.router.navigate(["/order",{
     isSingleProduct:true,id:foodId
    }])
 }

  checkout(){
    this.router.navigate(["/order",{
     isSingleProduct:false,id:0
    }])
  }
}

