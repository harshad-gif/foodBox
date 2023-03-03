package com.foodBox.service;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodBox.config.JwtRequestFilter;
import com.foodBox.entity.Food;
import com.foodBox.entity.FoodQuantity;
import com.foodBox.entity.OrderDetails;
import com.foodBox.entity.OrderInput;
import com.foodBox.entity.TransactionDetails;
import com.foodBox.entity.User;
import com.foodBox.respository.CartRepository;
import com.foodBox.respository.FoodRepository;
import com.foodBox.respository.OrderRepository;
import com.foodBox.respository.UserDao;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;


@Service
public class OrderService {
	
	private static final String ORDER_PLACED = "Placed";
	
	private static final String KEY="rzp_test_xwRpmJl11Wy2ri";
	
	private static final String KEY_SECRET="h0Nl1LsUNINIBuO38On3rY9D";
	
	private static final String CURRENCY="INR";
	

	@Autowired
	private OrderRepository orderRepo;
	
	@Autowired
	private FoodRepository productRepo;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private CartRepository cartRepo;
	
	public void placeOrder(OrderInput orderInput) {
		List<FoodQuantity> foodQuantity=orderInput.getFoodQuantity();
		
		for(FoodQuantity p:foodQuantity) {
			Food food = productRepo.findById(p.getFoodId()).get();
			String currentUser = JwtRequestFilter.CURRENT_USER;
			User user = userDao.findById(currentUser).get();
			OrderDetails orderDetails = new OrderDetails(
				
					orderInput.getFullName(),
					orderInput.getFullAddress(),
					orderInput.getContactNumber(),
					ORDER_PLACED,
					food.getFoodDiscountPrice()*p.getQuantity(),
					food,
					user,
					orderInput.getTransactionId()
							
			);
		
			orderRepo.save(orderDetails);
		}
	}
	
	
	public TransactionDetails createTransaction(Double amount) {
		try {
			
			JSONObject jo = new JSONObject();
			jo.put("amount", (amount*100));
			jo.put("currency", CURRENCY);
			
			RazorpayClient rc = new RazorpayClient(KEY,KEY_SECRET);
			Order order = rc.orders.create(jo);
			
			TransactionDetails ts = prepareTransaction(order);
			return ts;
			
			
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
		
		return null;
	}
	
	private TransactionDetails prepareTransaction(Order order) {
		String orderId = order.get("id");
		String currency = order.get("currency");
		Integer amount = order.get("amount");
		
		TransactionDetails td = new TransactionDetails(orderId,currency,amount,KEY);
		return td;
	}
}
