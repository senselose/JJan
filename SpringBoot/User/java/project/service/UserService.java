package com.project.service;


import org.springframework.ui.Model;
import com.project.user.User;

public interface UserService {

	public User registerUser (User user);

	public User findByUserIdAndPassword(String userid, String password, Model model);
}
