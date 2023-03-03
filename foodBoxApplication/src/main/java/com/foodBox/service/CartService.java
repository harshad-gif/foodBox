package com.foodBox.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodBox.config.JwtRequestFilter;
import com.foodBox.entity.Cart;
import com.foodBox.entity.Food;
import com.foodBox.entity.User;
import com.foodBox.respository.CartRepository;
import com.foodBox.respository.FoodRepository;
import com.foodBox.respository.UserDao;


@Service
public class CartService {
	
	@Autowired
	private CartRepository cartRepo;
	
	@Autowired
	private UserDao userRepo;
	
	@Autowired
	private FoodRepository foodRepo;
	
	
	public Cart addToCart(long foodId) {
		Food food = foodRepo.findById(foodId).get();
		String username = JwtRequestFilter.CURRENT_USER;
		User user = null;
		
		if(username != null) {
			user = userRepo.findById(username).get();
		}
		
		List<Cart> cartList = cartRepo.findByUser(user);
		List<Cart>filterdList = cartList.stream().filter(x -> x.getFood().getFoodId() == foodId).collect(Collectors.toList());
		
		if(filterdList.size()>0) {
			return null;
		}
		
		if(food != null && user != null) {
			Cart cart = new Cart(food, user);
			return cartRepo.save(cart);
		}
		return null;
	}
	
	public List<Cart> getCartDetails(){
		String username = JwtRequestFilter.CURRENT_USER;
		User user = userRepo.findById(username).get();
		return cartRepo.findByUser(user);
	}
	
	public void deleteCart(long cartId) {
		cartRepo.deleteById(cartId);
	}
}
