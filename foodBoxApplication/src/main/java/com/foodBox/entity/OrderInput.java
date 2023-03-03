package com.foodBox.entity;



import java.util.Date;
import java.util.List;

import lombok.Data;

public class OrderInput {

	private String fullName;
	private String fullAddress;
	private String contactNumber;
	private String transactionId;
	private List<FoodQuantity>foodQuantity;
	
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getFullAddress() {
		return fullAddress;
	}
	public void setFullAddress(String fullAddress) {
		this.fullAddress = fullAddress;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public List<FoodQuantity> getFoodQuantity() {
		return foodQuantity;
	}
	public void setFoodQuantity(List<FoodQuantity> foodQuantity) {
		this.foodQuantity = foodQuantity;
	}
	public String getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}
	
	
	
	
	
}
