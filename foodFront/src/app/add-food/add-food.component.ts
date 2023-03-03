import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FileHandle } from '../model/fileHandle.model';
import { Food } from '../model/food.model';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

  showMsg:boolean = false
  actionBtn = true
  text = true

  food:Food={
  foodId:null,
	foodName:"",
	foodCategory:"",
	foodDescription:"",
	hotelName:"",
	foodPrice:0,
	foodDiscountPrice:0,
  foodImage:[],
	active:0
  }

  constructor(
   private foodSer:FoodService,
   private router:ActivatedRoute,
   private sani:DomSanitizer
  ){}

  ngOnInit(): void {
    this.food = this.router.snapshot.data['food']
    
    if(this.food && this.food.foodId){
      this.actionBtn = false
      this.text  = false
    }
  }

  addFood(foodForm:NgForm){
    const foodFormData = this.prepareFormData(this.food)
    this.foodSer.addFoodDetails(foodFormData).subscribe(
      (res:Food)=>{
        console.log(res)
        
        alert("Food Added Successfully...")
        foodForm.reset()
        this.showMsg=true
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  prepareFormData(food:Food):FormData{
    const formData = new FormData()
    formData.append(
      'food',
      new Blob([JSON.stringify(food)],{type:'application/json'})
    )

    for(var i=0;i<food.foodImage.length;i++){
      formData.append(
        'imageFile',
        food.foodImage[i].file,
        food.foodImage[i].file.name
      )
    }
    return formData
  }

  onFileSelected(event:any){
    if(event.target.files){
      const file = event.target.files[0]
      const fileHandle:FileHandle={
        file:file,
        url:this.sani.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.food.foodImage.push(fileHandle)
    }
  }
}
