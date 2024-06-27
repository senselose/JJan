package com.project.user;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@Entity
@Table(name = "user")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	@Column(unique = true, nullable = false)
	private String userId;
	
	@Column(nullable = false)
	private String userName;
	
	@Column(unique = true, nullable = false)
	private String userNickName;
	
	@Column(nullable = false)
	private String userPassword;
	
	@Column(nullable = false)
	private String userEmail;
	
	@Column(nullable = false)
	private String userDomain;
	
	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	private Date userBirth;
	
	@Column(nullable = false)
	private String userPhoneNum;
	
	
	
	
	
}
