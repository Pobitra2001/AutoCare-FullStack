package com.pobitra.autocare.controller;

import com.pobitra.autocare.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")

public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/test")
    public ResponseEntity<String> sendTestEmail(
            @RequestParam String to) {

        emailService.sendEmail(
                to,
                "AutoCare Email Test",
                """
                Hello,

                Congratulations!

                Your AutoCare email service is working successfully.

                Regards,
                AutoCare Team
                """
        );

        return ResponseEntity.ok("Test email sent successfully.");
    }
}