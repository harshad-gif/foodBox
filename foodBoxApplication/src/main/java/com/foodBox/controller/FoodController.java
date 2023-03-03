package com.foodBox.controller;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.foodBox.entity.Food;
import com.foodBox.entity.ImageEn;
import com.foodBox.respository.FoodRepository;
import com.foodBox.service.foodService;



@RestController
public class FoodController {

	@Autowired
	private foodService foodSer;
	
	@Autowired
	private FoodRepository foodRepo;
	
	@PreAuthorize("hasRole('Admin')")
	@PostMapping(value ={"/addFood"},consumes= {MediaType.MULTIPART_FORM_DATA_VALUE})
	public Food addFood(@RequestPart("food") Food food,
			@RequestPart("imageFile") MultipartFile[] file) {
	try {
			
			Set<ImageEn> images = uploadImage(file);
			food.setFoodImage(images);
			
            return foodSer.addProduct(food);
			
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	public Set<ImageEn> uploadImage(MultipartFile[] multipartFiles) throws IOException {
		Set<ImageEn> imageEn = new HashSet<>();
		for(MultipartFile file:multipartFiles) {
			ImageEn image = new ImageEn(
				file.getOriginalFilename(),
				file.getContentType(),
				file.getBytes()
					
		);
		
			imageEn.add(image);					
		}
		return imageEn;
		
	}
	
	@GetMapping({"/getAllFood/{foodCategory}"})
	public List<Food> getAllFoodDetails(@PathVariable(name="foodCategory")String foodCategory){
		return foodSer.getAllFood(foodCategory);
	}
	
	@DeleteMapping({"/deleteFood/{foodId}"})
	public void deleteProduct(@PathVariable("foodId") long foodId) {
		foodSer.deleteProduct(foodId);
	}
	
	@GetMapping({"/getFoodId/{foodId}"})
	public Food getProductById(@PathVariable("foodId") long foodId) {
		return foodSer.getFoodById(foodId);
	}
	
	@GetMapping({"/getFoodDetail/{isSingleProduct}/{foodId}"})
	public List<Food> getProductDetail(@PathVariable(name="isSingleProduct")boolean isSingleProduct,
			@PathVariable(name="foodId")long foodId){
		return foodSer.getFoodDetail(isSingleProduct, foodId);
	}
	
}
