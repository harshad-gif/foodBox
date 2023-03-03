package com.foodBox.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodBox.entity.Food;



@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
	public List<Food> findByFoodCategory(String foodCategory);
}
