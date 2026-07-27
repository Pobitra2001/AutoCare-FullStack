package com.pobitra.autocare.controller;

import com.pobitra.autocare.dto.ChangePasswordRequestDTO;
import com.pobitra.autocare.dto.UpdateProfileRequestDTO;
import com.pobitra.autocare.dto.UserProfileResponseDTO;
import com.pobitra.autocare.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5173"
})
@Tag(name = "User API", description = "User Profile APIs")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Get logged-in user profile")
    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponseDTO> getProfile(
            Principal principal) {

        return ResponseEntity.ok(
                userService.getProfile(principal.getName())
        );
    }

    @Operation(summary = "Update logged-in user profile")
    @PutMapping("/profile")
    public ResponseEntity<UserProfileResponseDTO> updateProfile(
            Principal principal,
            @Valid @RequestBody UpdateProfileRequestDTO dto) {

        return ResponseEntity.ok(
                userService.updateProfile(
                        principal.getName(),
                        dto
                )
        );
    }

    @Operation(summary = "Change Password")
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            Principal principal,
            @Valid @RequestBody ChangePasswordRequestDTO dto) {

        userService.changePassword(
                principal.getName(),
                dto
        );

        return ResponseEntity.ok(
                "Password changed successfully."
        );
    }
}