package com.poly.datn.be.util;

import com.poly.datn.be.entity.Order;
import com.poly.datn.be.entity.Voucher;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.IOException;
import java.util.Base64;
import java.util.Date;
import java.util.Properties;

public class MailUtil {
    public static void sendEmail(Order order) throws MessagingException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("tanvxph13005@fpt.edu.vn", "SpringBoot@994");
            }
        });
        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress("tanvxph13005@fpt.edu.vn", false));

        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(order.getEmail()));
        StringBuilder sb = new StringBuilder()
                .append("Đơn hàng " + order.getId()).append("<br/>")
                .append("Tổng tiền: " + order.getTotal()).append("<br/>")
                .append("Ngày tạo: " + order.getCreateDate()).append("<br/>")
                .append("Người nhận:" + order.getFullname()).append("<br/>")
                .append("SDT: " + order.getPhone()).append("<br/>")
                .append("Địa chỉ: " + order.getAddress()).append("<br/>")
                .append("Theo dõi trạng thái đơn hàng tại đây: ")
                .append("http://localhost:3000/order/detail/").append(Base64.getUrlEncoder().encodeToString(String.valueOf(order.getId()).getBytes()));
        msg.setSubject("Cửa hàng giày SneakerHead thông báo");
        msg.setContent(sb.toString(), "text/html; charset=utf-8");
        msg.setSentDate(new Date());
        Transport.send(msg);
    }

    public static void sendEmail(Voucher voucher, Order order) throws MessagingException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("tanvxph13005@fpt.edu.vn", "SpringBoot@994");
            }
        });
        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress("tanvxph13005@fpt.edu.vn", false));

        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(order.getEmail()));
        StringBuilder sb = new StringBuilder()
                .append("Bạn nhận được voucher giảm giá cho lần sử dụng tiếp theo: " + voucher.getCode()).append("<br/>")
                .append("Số lần sử dụng: " + voucher.getCount()).append("<br/>")
                .append("Hạn sử dụng: " + voucher.getExpireDate()).append("<br/>")
                .append("Giảm giá: " + voucher.getDiscount() + " %").append("<br/>");
        msg.setSubject("Cửa hàng giày SneakerHead thông báo");
        msg.setContent(sb.toString(), "text/html; charset=utf-8");
        msg.setSentDate(new Date());
        Transport.send(msg);
    }

    public static void sendmailForgotPassword(String receive, String password) throws MessagingException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("tanvxph13005@fpt.edu.vn", "SpringBoot@994");
            }
        });
        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress("tanvxph13005@fpt.edu.vn", false));

        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(receive));
        msg.setSubject("Công Minh Idol thông báo");
        msg.setContent("New Pasword: " + password, "text/html");
        msg.setSentDate(new Date());

        Transport.send(msg);
    }
}
