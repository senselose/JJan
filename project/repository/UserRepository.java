package com.project.repository;

import org.springframework.data.repository.CrudRepository;


import com.project.user.User;

public interface UserRepository extends CrudRepository<User, String> {
	
	boolean existsByUserId(String userId);     // 회원가입시 아이디 중복불가 
	 
	boolean existsByUserNickName(String userNickName); // 회원가입시 닉네임 중복 불가
	
	User findByUserIdAndUserPassword(String userId, String userPassword);



}
