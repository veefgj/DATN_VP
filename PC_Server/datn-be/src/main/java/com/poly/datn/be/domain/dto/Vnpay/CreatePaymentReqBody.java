package com.poly.datn.be.domain.dto.Vnpay;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
public class CreatePaymentReqBody {
    @NotNull(message = "idBill không được null")
    @NotEmpty(message = "idBill không được trống")
    private Number idBill;

    @NotNull(message = "orderMoney không được null")
    @NotEmpty(message = "orderMoney không được trống")
    private BigDecimal orderMoney;

    @NotNull(message = "idUser không được null")
    @NotEmpty(message = "idUser không được trống")
    private Number idUser;

    private String codeBill;

}
