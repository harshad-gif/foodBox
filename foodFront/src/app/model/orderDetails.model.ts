import { orderQuan } from "./orderQuan.model"



export interface OrderDetails{
    fullName:string
	fullAddress:string
	contactNumber:string
	transactionId:string
	foodQuantity:orderQuan[]
}