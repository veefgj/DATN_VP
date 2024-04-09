package com.poly.datn.be.beans;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.poly.datn.be.domain.dto.ReqCreateAccountDto;
import com.poly.datn.be.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Configuration
public class user {

    @Autowired
    private AccountService accountService;
//    @NotNull(message = "Username không null")
//    @NotEmpty(message = "Username không trống")
//    private String username;
//    @NotNull(message = "Password không null")
//    @NotEmpty(message = "Password không trống")
//    private String password;
//    //role
//    @NotNull(message = "Role id không được null")
//    private Long roleId;
//    //account detail
//    @NotNull(message = "FullName không được null")
//    @NotEmpty(message = "FullName không được trống")
//    private String fullName;
//    @NotNull(message = "Gender không được null")
//    @NotEmpty(message = "Gender không được trống")
//    private String gender;
//    @NotNull(message = "Phone không được null")
//    @NotEmpty(message = "Phone không được trống")
//    private String phone;
//    @NotNull(message = "Email không được null")
//    @NotEmpty(message = "Email không được trống")
//    private String email;
//    @NotNull(message = "Address không được null")
//    @NotEmpty(message = "Address không được trống")
//    private String address;
//    @NotNull(message = "BirthDate không được null")
//    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
//    private LocalDate birthDate;
    @Bean
    void createUserDefault(){

//        accountService.register()
    }
}
