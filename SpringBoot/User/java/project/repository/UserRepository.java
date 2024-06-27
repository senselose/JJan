package com.project.repository;

import org.springframework.data.repository.CrudRepository;


import com.project.user.User;

public interface UserRepository extends CrudRepository<User, String> {
	
	boolean existsByUserId(String userId);     // 회원가입시 아이디 중복불가 
	
	boolean existsByUserEmail(String userEmail); // 회원가입시 이메일 중복불가 

	User findByUserIdAndUserPassword(String userId, String userPassword);

}
