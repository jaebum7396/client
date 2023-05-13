package client.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ClientController {
    @GetMapping("/chat/signup")
    public String chatSignup() {
        return "chat/signup";
    }
	@GetMapping("/chat/login")
    public String chatLogin() {
        return "chat/login";
    }
    @GetMapping("/chat/app")
    public String chatApp() {
        return "chat/app";
    }
    @GetMapping("/admin/index")
    public String adminIndex() {
        return "admin/index";
    }
}
