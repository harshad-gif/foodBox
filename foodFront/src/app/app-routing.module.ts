import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFoodComponent } from './add-food/add-food.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { CartComponent } from './cart/cart.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { FoodResolverService } from './services/food-resolver.service';
import { OrderResolverService } from './services/order-resolver.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { ViewFoodComponent } from './view-food/view-food.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signUp',component:SignUpComponent},
  {path:'cart',component:CartComponent},
  {path:'confirm',component:ConfirmComponent},
  {path:'view',component:ViewFoodComponent,resolve:{food:FoodResolverService}},
  {path:'order',component:OrderComponent,resolve:{foodDetails:OrderResolverService}},
  {path:'add',component:AddFoodComponent,resolve:{food:FoodResolverService}},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuard],data:{roles:["Admin"]}},
  {path:'user',component:UserComponent,canActivate:[AuthGuard],data:{roles:['User']}},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
