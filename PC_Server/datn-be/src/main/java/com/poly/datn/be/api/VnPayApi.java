package com.poly.datn.be.api;

import com.poly.datn.be.domain.constant.VnPayConstant;
import com.poly.datn.be.domain.dto.Vnpay.CreatePaymentReqBody;
import com.poly.datn.be.service.VnpayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;

@RestController
@CrossOrigin("*")
@RequestMapping(VnPayConstant.VNPAY_PREFIX)
public class VNpayAPI {
    @Autowired
    VnpayService vnpayService;

    @PostMapping(VnPayConstant.VNPAY_CREATE)
    public String createOrder() {
        CreatePaymentReqBody bodyTest = new CreatePaymentReqBody();

        bodyTest.setIdBill(1);
        bodyTest.setIdUser(1);
        bodyTest.setOrderMoney(new BigDecimal(250202));

        return vnpayService.createOrder(bodyTest);
    }

    @Transactional
    @GetMapping(VnPayConstant.VNPAY_RETURN)
    public ResponseEntity<?> returnPayment(HttpServletRequest request) {
        return vnpayService.returnPayment(request);
    }
}
