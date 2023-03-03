package com.foodBox.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table
public class Cart {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long cartId;
	@OneToOne
	private Food food;
	@OneToOne
	private User user;
	
	public Cart() {}
	
	

	public Cart(Food food, User user) {
		super();
		this.food = food;
		this.user = user;
	}



	public long getCartId() {
		return cartId;
	}

	public void setCartId(long cartId) {
		this.cartId = cartId;
	}

	public Food getFood() {
		return food;
	}

	public void setFood(Food food) {
		this.food = food;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	};
	
	
}
