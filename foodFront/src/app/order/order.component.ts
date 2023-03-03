import { Component,Injector,NgZone,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from '../model/food.model';
import { OrderDetails } from '../model/orderDetails.model';
import { FoodService } from '../services/food.service';

declare var Razorpay:any
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  foodDetails : Food[] = []


  orderDetails:OrderDetails={
    fullName:'',
    fullAddress:'',
    contactNumber:'',
    transactionId:'',
    foodQuantity:[]
  }
  constructor(
    private foodSer:FoodService,
    private activateRoute:ActivatedRoute,
    private router:Router,
    private injector:Injector
  ){}

  ngOnInit(): void {
    this.foodDetails = this.activateRoute.snapshot.data['foodDetails']

    

    this.foodDetails.forEach(
      x => this.orderDetails.foodQuantity.push(
        {foodId:x.foodId,quantity:1}
      )
    )

    console.log(this.foodDetails)
    console.log(this.orderDetails)
  }

  getQuantity(foodId:any){
    const filterProduct = this.orderDetails.foodQuantity.filter(
      (foodQuantity) => foodQuantity.foodId === foodId
    )
    return filterProduct[0].quantity
  }

  getTotal(foodId:number,foodDiscountPrice:number){
    const filterProduct = this.orderDetails.foodQuantity.filter(
      (foodQuantity) => foodQuantity.foodId === foodId
    )
    return filterProduct[0].quantity * foodDiscountPrice
  }

  onQuantitChange(q:any,foodId:number){
    this.orderDetails.foodQuantity.filter(
      (orderProduct) => orderProduct.foodId === foodId
    )[0].quantity = q
  }

  grandTotal(){
    let total = 0
    this.orderDetails.foodQuantity.forEach(
    (foodQuantity)=>{
      const price =this.foodDetails.filter(food=>food.foodId === foodQuantity.foodId)[0].foodDiscountPrice
      total = total + price * foodQuantity.quantity
    }
    )
    return total
  }

  public placeOrder(orderForm:NgForm){

    this.foodSer.placeOrder(this.orderDetails).subscribe(
      (res)=>{
        console.log(res)
        orderForm.reset()
        
        const ngZone = this.injector.get(NgZone)
        ngZone.run(
          ()=>{
            this.router.navigate(["/confirm"])
          }
        )

        
      },
      (error)=>{
        console.log(error)
      }

    )

  }

  createTransactionAndPlaceOrder(orderForm:NgForm){
    let amount = this.grandTotal()
    this.foodSer.createTransaction(amount).subscribe(
      (res)=>{
        console.log(res)
        this.openModal(res,orderForm)
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  openModal(res:any,orderForm:NgForm){
    var options={
      order_id : res.orderId,
      key:res.key,
      amount:res.amount,
      currency:res.currency,
      name:'FoodBox',
      description:'order at your door',
      image:'data:image/png;base64,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',
      handler:(res:any)=>{
        if(res!=null && res.razorpay_payment_id!=null){

        
        this.processResponse(res,orderForm)
        }else{
          alert("Payment Failed......")
        }
      },
      prefill:{
        name:'foodBox',
        email:'foodbox@ggmail.com',
        contact:'8080808080'
      },
      theme:{
        color:'#F37254'
      }

    }
    var razorPayObject = new Razorpay(options)
    razorPayObject.open()
  }

  processResponse(res:any,orderForm:NgForm){
      this.orderDetails.transactionId = res.razorpay_payment_id
      this.placeOrder(orderForm)
  }


}
