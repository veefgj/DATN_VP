package com.poly.datn.be.service.impl;

import com.poly.datn.be.config.VnpayConfig;
import com.poly.datn.be.config.repo.AttributeRepo;
import com.poly.datn.be.config.repo.CartItemRepo;
import com.poly.datn.be.config.repo.OrderDetailRepo;
import com.poly.datn.be.config.repo.OrderRepo;
import com.poly.datn.be.domain.dto.Vnpay.CreatePaymentReqBody;
import com.poly.datn.be.entity.Attribute;
import com.poly.datn.be.entity.CartItem;
import com.poly.datn.be.entity.Order;
import com.poly.datn.be.entity.OrderDetail;
import com.poly.datn.be.service.VnpayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

import java.math.BigDecimal;

@Service
public class VnpayServiceImpl implements VnpayService {
    @Autowired
    OrderRepo orderRepo;

    @Autowired
    OrderDetailRepo orderDetailRepo;

    @Autowired
    AttributeRepo attributeRepo;

    @Autowired
    CartItemRepo cartItemRepo;

    @Override
    public String createOrder(CreatePaymentReqBody body) {
        BigDecimal amount = body.getOrderMoney();

        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_TxnRef = VnpayConfig.getRandomNumber(8);
        String vnp_IpAddr = "127.0.0.1";
        String vnp_TmnCode = VnpayConfig.vnp_TmnCode;
        String orderType = "order-type";
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", amount.multiply(new BigDecimal("100")).toPlainString());
        vnp_Params.put("vnp_CurrCode", "VND");

        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", String.valueOf(body.getIdBill()));
        vnp_Params.put("vnp_OrderType", orderType);

        String locate = "vn";
        vnp_Params.put("vnp_Locale", locate);

        vnp_Params.put("vnp_ReturnUrl", VnpayConfig.getReturnUrl(body.getOrderMoney(), String.valueOf(body.getIdBill()), String.valueOf(body.getIdUser())));
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                hashData.append(fieldName);
                hashData.append('=');
                try {
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VnpayConfig.hmacSHA512(VnpayConfig.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VnpayConfig.vnp_PayUrl + "?" + queryUrl;
        return paymentUrl;
    }

    @Override
    public ResponseEntity<?> returnPayment(HttpServletRequest request) {
        int paymentStatus = VnpayConfig.orderReturn(request);

        if (paymentStatus == 1) {
//            String idUser = request.getParameter("idUser");
//            String idOrder = request.getParameter("idOrder");
//
//            Order order = orderRepo.getReferenceById(Long.valueOf(idOrder));
//
//            List<OrderDetail> listOrderDetails = orderDetailRepo.findAllByOrder_Id(order.getId());
//
//            for (OrderDetail orderDetail : listOrderDetails) {
//                Attribute attribute = attributeRepo.findByID(orderDetail.getAttribute().getId());
//                attribute.setStock(attribute.getStock() - orderDetail.getQuantity());
//                attribute.setCache(attribute.getCache() + orderDetail.getQuantity());
//
//                deleteCartDetails(attribute.getId(), Long.valueOf(idUser));
//                attributeRepo.save(attribute);
//            }

            //Luu hoa don
//            order.setNote("Thanh toan bang VNPAY");
//            order.setOrderStatus(1);

            HttpHeaders headers = new HttpHeaders();
            headers.setLocation(URI.create("https://www.youtube.com/watch?v=121SP-v2mTo"));
            return new ResponseEntity<>(headers, HttpStatus.FOUND);
        } else {
            HttpHeaders headers = new HttpHeaders();
            headers.setLocation(URI.create("http://127.0.0.1:5501/templates/banHang/online/vnpay/Error.html"));
            return new ResponseEntity<>(headers, HttpStatus.FOUND);
        }
    }

    private void deleteCartDetails(Long idAttribute, Long idUser) {
        CartItem cartItem = cartItemRepo.findCartItemByAccountIdAndAttributeId(idUser, idAttribute);
        cartItemRepo.delete(cartItem);
        cartItemRepo.save(cartItem);
    }
}
