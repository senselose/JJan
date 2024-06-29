package com.project.controller;

import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.service.UserService;
import com.project.user.User;



@Controller
public class UserController {
	
	@Autowired
	private UserService userService;
	
	// 첫 화면은 index 로 임시 조건부
	@GetMapping("/")
	public String home(HttpServletRequest request, Model model) {
		HttpSession session = request.getSession(false);
		if(session != null && session.getAttribute("userId") != null) {
			String userId = (String) session.getAttribute("userId");
			model.addAttribute("sessionUserId", userId);		
		} 
		return "index";
	}
	
	// 로그인 클릭 시 로그인 폼으로 이동
	@GetMapping("/loginForm")
	public String loginForm() {
		return "loginForm"; // login html 반환
	}
	
	// Post 방식으로 로그인 처리
	@PostMapping("/login")
	public String login(@RequestParam String userId,
						@RequestParam String userPassword,
						HttpSession session, // 세션에 로그인 정보 저장(유지)
						Model model) {
		// 로그인 처리 로직
		User user = userService.findByUserIdAndUserPassword(userId, userPassword);
		if (user != null) {
			session.setAttribute("userId", userId);
			model.addAttribute("sessionUserId", user.getUserId());
			return "loginSuccess";  // 로그인 성공 시 홈으로 
		} else {
			model.addAttribute("error", "Invalid username or password");
			return "loginFail";   // 로그인 실패 시 페이지로 
		} 
	}
	
	
	@GetMapping("/registerForm")
	public String registerForm() {
		return "registerForm";
	}
	
	// 회원가입 정보 입력
	@PostMapping("/registerForm")
	public String register(@RequestParam("userId") String userId,
						   @RequestParam("userName") String userName,
						   @RequestParam("userNickName") String userNickName,
						   @RequestParam("userPassword") String userPassword,
						   @RequestParam("userEmail") String userEmail,   
						   @RequestParam("userDomain") String userDomain,
						   @RequestParam("userBirth") @DateTimeFormat(pattern = "yyyy-MM-dd") 
																	  Date userBirth,
						   @RequestParam("userPhoneNum1") String userPhoneNum1,
						   @RequestParam("userPhoneNum2") String userPhoneNum2,
						   @RequestParam("userPhoneNum3") String userPhoneNum3,
						   Model model) throws ParseException {
		
		String userPhoneNum = userPhoneNum1 + "-" + userPhoneNum2 + "-" + userPhoneNum3;
		String fullEmail = userEmail + "@" + userDomain;
		

		User user = new User();
		user.setUserId(userId);
		user.setUserName(userName);
		user.setUserNickName(userNickName);
		user.setUserPassword(userPassword);
		user.setUserEmail(fullEmail);
		user.setUserDomain(userDomain);
		user.setUserBirth(userBirth);
		user.setUserPhoneNum(userPhoneNum);
		
		userService.registerUser(user);
		
		return "registerSuccess";
		
	}
	
	@GetMapping("/registerSuccess")
	public String registerSuccess() {
		return "registerSuccess";
	}
	
	// 로그아웃
	@PostMapping("/logout")
	public String logout(HttpServletRequest request) {
		// 세션을 invalidate 하여 로그아웃 처리
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.invalidate();
		}
		return "redirect:/"; // 로그아웃 후 홈화면으로
	}
	
	// 아이디 중복 확인
	@GetMapping("/checkUserId")
	@ResponseBody
	public Map<String, Boolean> checkUserId(@RequestParam("userId") String userId) {
		boolean exists = userService.isUserIdExists(userId);
		Map<String, Boolean> response = new HashMap<>();
		response.put("exists", exists);
		return response;
	}
	
	// 닉네임 중복 확인
	@GetMapping("/checkUserNickName")
	@ResponseBody
	public Map<String, Boolean> checkUserNickName(@RequestParam("userNickName") String userNickName) {
		boolean exists = userService.isUserNickNameExists(userNickName);
		Map<String, Boolean> response = new HashMap<>();
		response.put("exists", exists);
		return response;
	}
	
}

