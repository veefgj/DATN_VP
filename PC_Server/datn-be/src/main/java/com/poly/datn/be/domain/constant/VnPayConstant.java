package com.poly.datn.be.domain.constant;

public class VnPayConstant {
    //Config
    public static final String VNP_PAYURL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    public static final String VNP_RETURNURL = "http://127.0.0.1:8080/payment/return?";
    public static final String VNP_TMNCODE = "JR46KTRL";
    public static final String VNP_HASHSECRET = "XATJYHRKXDDVMNMIXGWZQEXJWQJQUQXO";
    public static final String VNP_APIURL = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";

    //URI
    public static final String VNPAY_PREFIX = "/payment";
    public static final String VNPAY_CREATE = "/create";
    public static final String VNPAY_RETURN = "/return";
}
