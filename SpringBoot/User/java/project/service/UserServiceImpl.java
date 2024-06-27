package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.project.repository.UserRepository;
import com.project.user.User;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public User registerUser(User user) {
		return userRepository.save(user);
	}
	
	@Override
	public User findByUserIdAndPassword(String userId, String userPassword, Model model) {
		return userRepository.findByUserIdAndUserPassword(userId, userPassword);
	}
	
	

	
}
