package com.pobitra.autocare.dto;

import jakarta.validation.constraints.NotBlank;

public class UpdateProfileRequestDTO {

    @NotBlank(message = "Full name is required")
    private String fullName;

    public UpdateProfileRequestDTO() {
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}