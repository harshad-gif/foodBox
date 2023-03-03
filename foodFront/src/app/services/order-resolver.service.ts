import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Food } from '../model/food.model';
import { FoodService } from './food.service';
import { ImageResolverService } from './image-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class OrderResolverService implements Resolve<Food[]>  {

  constructor(
    private foodSer:FoodService,
    private imgSer:ImageResolverService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Food[] | Observable<Food[]> | Promise<Food[]> {
    const id = route.paramMap.get('id')
    const isSingleProduct = route.paramMap.get('isSingleProduct')
    return this.foodSer.getFoodDetail(isSingleProduct,id)
    .pipe(
        map(
            (x:Food[],i)=>x.map(((food:Food)=>this.imgSer.createImage(food)))
        )
    )
  }
}
