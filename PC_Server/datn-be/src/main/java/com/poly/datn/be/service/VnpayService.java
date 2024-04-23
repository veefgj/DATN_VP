package com.poly.datn.be.service;

import com.poly.datn.be.domain.dto.Vnpay.CreatePaymentReqBody;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public interface VnpayService {
    String createOrder(CreatePaymentReqBody body);

    ResponseEntity<?> returnPayment(HttpServletRequest request);
}
