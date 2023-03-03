package com.foodBox.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.foodBox.entity.OrderInput;
import com.foodBox.entity.TransactionDetails;
import com.foodBox.service.OrderService;


@RestController
public class OrderController {

	@Autowired
	private OrderService orderSer;
	
	@PostMapping({"/placeOrder"})
	public void placeOrder(@RequestBody OrderInput orderInput) {
		orderSer.placeOrder(orderInput);
	}
	
	
	@GetMapping({"/createTransaction/{amount}"})
	public TransactionDetails createTransaction(@PathVariable(name="amount")Double amount) {
		return orderSer.createTransaction(amount);
	}
}
