package com.poly.datn.be;
import com.poly.datn.be.entity.Attribute;
import com.poly.datn.be.entity.Product;
import com.poly.datn.be.config.repo.AttributeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import java.util.List;
@SpringBootApplication
@EnableScheduling
public class Application implements CommandLineRunner {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Autowired
    AttributeRepo attributeRepo;

    @Override
    public void run(String... args) throws Exception {
        List<Attribute> attributes = attributeRepo.findAll();
        for(Attribute attribute: attributes){
            Product p = attribute.getProduct();
            attribute.setName(p.getName());
            attributeRepo.save(attribute);
        }
    }
}
