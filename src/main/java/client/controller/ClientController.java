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
    @GetMapping("/admin/user")
    public String adminUser() {
        return "admin/user";
    }
    @GetMapping("/pal/supporter")
    public String palSupporter() {return "pal/supporter";}
    @GetMapping("/nutritionist/app")
    public String nutritionist() {return "/nutritionist/app";}
    @GetMapping("/nutritionist/app2")
    public String nutritionist2() {return "/nutritionist/app2";}
    @GetMapping("/policy/privacy_policy")
    public String privacyPolicy() {return "policy/privacy_policy";}
}
