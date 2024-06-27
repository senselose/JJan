package com.project.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.service.UserService;
import com.project.user.User;



@Controller
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/")
	public String home() {
		return "index";
	}
	
	// 로그인 폼으로 이동
	@GetMapping("/loginForm")
	public String loginForm() {
		return "loginForm"; // login html 반환
	}
	
	@PostMapping("/login")
	public String login(@RequestParam String userId, @RequestParam String userPassword, Model model) {
		User user = userService.findByUserIdAndPassword(userId, userPassword, model);
		if (user != null) {
			model.addAttribute("userName", user.getUserId());
			return "loginSuccess";
		} else {
			model.addAttribute("error", "Invalid username or userpassword");
		} return "login";
	}
	
	
	@GetMapping("/registerForm")
	public String registerForm() {
		return "registerForm";
	}
	
	// 회원가입 정보 입력
	@PostMapping("/register")
	public String register(@RequestParam("id") String userId,
						   @RequestParam("name") String userName,
						   @RequestParam("nickname") String userNickName,
						   @RequestParam("password") String userPassword,
						   @RequestParam("email") String userEmail,
						   @RequestParam("birth") String userBirth,
						   @RequestParam("phone") String userPhoneNum,
						   Model model) throws ParseException {
		
		User user = new User();
		user.setUserId(userId);
		user.setUserName(userName);
		user.setUserNickName(userNickName);
		user.setUserPassword(userPassword);
		user.setUserEmail(userEmail);
		user.setUserDomain(userEmail.split("@")[1]); // 이메일에서 도메인 추출
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		user.setUserBirth(dateFormat.parse(userBirth));
		user.setUserPhoneNum(userPhoneNum);
		
		userService.registerUser(user);
		
		return "redirect:/login";
		
	}
	
	
}

