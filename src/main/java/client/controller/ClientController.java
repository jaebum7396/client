package client.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ClientController {
	@GetMapping("/chatView")
    public String chatView() {
        return "chat";
    }
	@GetMapping("/loginView")
    public String loginView() {
        return "login";
    }
	@GetMapping("/")
    public String indexView() {
        return "index";
    }
}
