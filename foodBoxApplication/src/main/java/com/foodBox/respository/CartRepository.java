package com.foodBox.respository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodBox.entity.Cart;
import com.foodBox.entity.User;


@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
	public List<Cart> findByUser(User user);
}
