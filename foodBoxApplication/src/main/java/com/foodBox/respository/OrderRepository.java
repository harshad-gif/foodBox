package com.foodBox.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.foodBox.entity.OrderDetails;

@Repository
public interface OrderRepository extends JpaRepository<OrderDetails, Long> {

}
