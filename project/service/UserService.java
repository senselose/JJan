package com.project.service;

import com.project.user.User;

public interface UserService {

	public void registerUser (User user);

	public User findByUserIdAndUserPassword(String userId, String userPassword);
	
	boolean isUserIdExists(String userId);
	
	boolean isUserNickNameExists(String userNickName);
}
