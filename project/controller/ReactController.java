package com.project.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ReactController {
	
	@GetMapping("/api/hello")
	public String hello() {
		return "안녕 스프링부트!";
	}
	
	
}
