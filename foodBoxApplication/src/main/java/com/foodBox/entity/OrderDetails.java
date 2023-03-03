package com.foodBox.entity;



import java.util.Date;

import javax.persistence.*;


@Entity
@Table

public class OrderDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long orderId;
    private String userFullName;
	private String orderAddress;
	private String contactNumber;
	private String orderStatus;
	private double orderAmount;
	
	@OneToOne
	private Food food;
	
	@OneToOne
	private User user;
	
	private String transactionId;
	
	

	public OrderDetails(String userFullName, String orderAddress, String contactNumber, String orderStatus,
			double orderAmount, Food food, User user, String transactionId) {
		super();
		this.userFullName = userFullName;
		this.orderAddress = orderAddress;
		this.contactNumber = contactNumber;
		this.orderStatus = orderStatus;
		this.orderAmount = orderAmount;
		this.food = food;
		this.user = user;
		this.transactionId = transactionId;
	}



	public String getTransactionId() {
		return transactionId;
	}



	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}



	public long getOrderId() {
		return orderId;
	}



	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}



	public String getUserFullName() {
		return userFullName;
	}



	public void setUserFullName(String userFullName) {
		this.userFullName = userFullName;
	}



	public String getOrderAddress() {
		return orderAddress;
	}



	public void setOrderAddress(String orderAddress) {
		this.orderAddress = orderAddress;
	}



	public String getContactNumber() {
		return contactNumber;
	}



	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}



	public String getOrderStatus() {
		return orderStatus;
	}



	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}



	public double getOrderAmount() {
		return orderAmount;
	}



	public void setOrderAmount(double orderAmount) {
		this.orderAmount = orderAmount;
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
	}
	
	
}
