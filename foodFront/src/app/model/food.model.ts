import { FileHandle } from "./fileHandle.model";

export interface Food{
    foodId:any;
	foodName:string;
	foodCategory:string;
	foodDescription:string;
	hotelName:string;
	foodPrice:number;
	foodDiscountPrice:number;
	foodImage:FileHandle[],
	active:number
}