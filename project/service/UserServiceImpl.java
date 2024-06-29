package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.repository.UserRepository;
import com.project.user.User;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public void registerUser(User user) {
		userRepository.save(user);
	}
	
	@Override
	public User findByUserIdAndUserPassword(String userId, String userPassword) {
		return userRepository.findByUserIdAndUserPassword(userId, userPassword);
	}

	@Override
	public boolean isUserIdExists(String userId) {
		return userRepository.existsByUserId(userId);
	}

	@Override
	public boolean isUserNickNameExists(String userNickName) {
		return userRepository.existsByUserNickName(userNickName);
	}
	
	

	
}
