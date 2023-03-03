import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from '../model/food.model';

@Component({
  selector: 'app-view-food',
  templateUrl: './view-food.component.html',
  styleUrls: ['./view-food.component.css']
})
export class ViewFoodComponent implements OnInit {

  food!: Food;

  constructor(
    private actRoute:ActivatedRoute,
    private router:Router,
  ){}

  ngOnInit(): void {
    this.food = this.actRoute.snapshot.data['food']
    console.log(this.food)
  }

  buy(foodId:number){
    this.router.navigate(["/order",{
     isSingleProduct:true,id:foodId
    }])
 }
}
