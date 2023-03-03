package com.foodBox.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


import com.foodBox.config.JwtRequestFilter;
import com.foodBox.entity.Cart;
import com.foodBox.entity.Food;
import com.foodBox.entity.User;
import com.foodBox.respository.CartRepository;
import com.foodBox.respository.FoodRepository;
import com.foodBox.respository.UserDao;

@Service
public class foodService {

	@Autowired
	private FoodRepository foodRepo;
	
	@Autowired
	private CartRepository cartRepo;
	
	@Autowired
	private UserDao userDao;
	
	public Food addProduct(Food food) {
		return foodRepo.save(food);
	}
	
	public List<Food> getAllFood(String foodCategory){
		List<Food> food = new ArrayList<>();
		if(foodCategory.equals("All")) {
			foodRepo.findAll().forEach(x -> food.add(x));
		}else {
			foodRepo.findByFoodCategory(foodCategory).forEach(x -> food.add(x));
		}
		return food;
	}
	

	public Food getFoodById(long foodId) {
		return foodRepo.findById(foodId).get();
	}
	
	public void deleteProduct(long foodId) {
		 foodRepo.deleteById(foodId);
	}
	
	public List<Food> getFoodDetail(boolean isSingleProduct,long foodId){
		
		if(isSingleProduct && foodId != 0) {
			List<Food> list = new ArrayList<>();
			Food food = foodRepo.findById(foodId).get();
			list.add(food);
			return list;
		}
		else {
			
			String username = JwtRequestFilter.CURRENT_USER;
			User user = userDao.findById(username).get();
			List<Cart> cart = cartRepo.findByUser(user);
			
			return cart.stream().map(x -> x.getFood()).collect(Collectors.toList());
		}
		
		}
	
}
