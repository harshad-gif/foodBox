package com.foodBox.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.foodBox.entity.Cart;
import com.foodBox.service.CartService;



@RestController
public class CartController {
	@Autowired
	private CartService cartSer;
	
	@GetMapping({"/addCart/{foodId}"})
	public Cart addToCart(@PathVariable(name="foodId") long foodId) {
		return cartSer.addToCart(foodId);
	}
	
	@GetMapping({"/getCartDetails"})
	public List<Cart> getCartDetails(){
		return cartSer.getCartDetails();
	}
	
	@DeleteMapping({"/deleteCart/{cartId}"})
	public void deleteCart(@PathVariable(name="cartId") long cartId) {
		cartSer.deleteCart(cartId);
	}
}
