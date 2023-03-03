package com.foodBox.respository;

import org.springframework.data.repository.CrudRepository;

import com.foodBox.entity.*;

public interface RoleDao extends CrudRepository<Role, String> {

}
