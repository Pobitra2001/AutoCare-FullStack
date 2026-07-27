package com.pobitra.autocare.service;

import com.pobitra.autocare.dto.ChangePasswordRequestDTO;
import com.pobitra.autocare.dto.RegisterRequestDTO;
import com.pobitra.autocare.dto.UpdateProfileRequestDTO;
import com.pobitra.autocare.dto.UserProfileResponseDTO;
import com.pobitra.autocare.entity.User;

public interface UserService {

    User register(RegisterRequestDTO dto);

    User findByEmail(String email);

    UserProfileResponseDTO getProfile(String email);

    UserProfileResponseDTO updateProfile(
            String email,
            UpdateProfileRequestDTO dto
    );

    void changePassword(
            String email,
            ChangePasswordRequestDTO dto
    );
}