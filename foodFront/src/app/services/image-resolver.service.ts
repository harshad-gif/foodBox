import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../model/fileHandle.model';
import { Food } from '../model/food.model';

@Injectable({
  providedIn: 'root'
})
export class ImageResolverService {

  constructor(private sani:DomSanitizer) { }


  public createImage(food:Food){
    const foodImage:any[] = food.foodImage
    const foodImageHandle:FileHandle[] = []

    for(let i=0;i<foodImage.length;i++){
      const imgFileData = foodImage[i]
      const imgblob = this.picbyteToBlob(imgFileData.picByte, imgFileData.type)
      
      const imageFile = new File([imgblob],imgFileData.name,{type:imgFileData.type})

      const finalFileHandle:FileHandle={
        file:imageFile,
        url:this.sani.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      }
      foodImageHandle.push(finalFileHandle)
    }
    food.foodImage = foodImageHandle
    return food
  }

  public picbyteToBlob(picBytes:any,imageType:any){
    const byteString = window.atob(picBytes)
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const int8Array = new Uint8Array(arrayBuffer)

    for(let i=0;i<byteString.length;i++){
      int8Array[i] = byteString.charCodeAt(i)

    }

    const blob = new Blob([int8Array],{type:imageType})
    return blob
  }
}
