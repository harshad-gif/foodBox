package com.foodBox.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;




@Entity
public class Food {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long foodId;
	private String foodName;
	private String foodCategory;
	@Column(length=2000)
	private String foodDescription;
	private String hotelName;
	private double foodPrice;
	private double foodDiscountPrice;
	
	
	private int active = 0;
	
	@ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
	@JoinTable(name = "food_images",
	
	         joinColumns= {
	        		 @JoinColumn(name="food_id")
	         },
	         inverseJoinColumns= {
	        		 @JoinColumn(name="image_id")
	         }
			
	)
	private Set<ImageEn> foodImage;
	
	
	
	
	public Set<ImageEn> getFoodImage() {
		return foodImage;
	}
	public void setFoodImage(Set<ImageEn> foodImage) {
		this.foodImage = foodImage;
	}
	public long getFoodId() {
		return foodId;
	}
	public void setFoodId(long foodId) {
		this.foodId = foodId;
	}
	public String getFoodName() {
		return foodName;
	}
	public void setFoodName(String foodName) {
		this.foodName = foodName;
	}
	public String getFoodCategory() {
		return foodCategory;
	}
	public void setFoodCategory(String foodCategory) {
		this.foodCategory = foodCategory;
	}
	public String getFoodDescription() {
		return foodDescription;
	}
	public void setFoodDescription(String foodDescription) {
		this.foodDescription = foodDescription;
	}
	public String getHotelName() {
		return hotelName;
	}
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	public double getFoodPrice() {
		return foodPrice;
	}
	public void setFoodPrice(double foodPrice) {
		this.foodPrice = foodPrice;
	}
	public double getFoodDiscountPrice() {
		return foodDiscountPrice;
	}
	public void setFoodDiscountPrice(double foodDiscountPrice) {
		this.foodDiscountPrice = foodDiscountPrice;
	}
	
	public int getActive() {
		return active;
	}
	public void setActive(int active) {
		this.active = active;
	}
	
	
}
