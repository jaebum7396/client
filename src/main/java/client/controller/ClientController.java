package client.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ClientController {
	@GetMapping("/chat/login")
    public String chatLogin() {
        return "/chat/login";
    }
    @GetMapping("/chat/register")
    public String chatRegister() {
        return "/chat/register";
    }
    @GetMapping("/admin/index")
    public String adminIndex() {
        return "/admin/index";
    }
}
