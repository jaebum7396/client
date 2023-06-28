package client.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HongController {
    @GetMapping("/hong/index")
    public String hongIndex() {
        return "hong/index";
    }
}
