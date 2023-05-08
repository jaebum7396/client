package client.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ClientController {
    @GetMapping("/chat/register")
    public String chatRegister() {
        return "chat/register";
    }
	@GetMapping("/chat/login")
    public String chatLogin() {
        return "chat/login";
    }
    @GetMapping("/chat/index")
    public String chatIndex() {
        return "chat/index";
    }
    @GetMapping("/admin/index")
    public String adminIndex() {
        return "admin/index";
    }
}
