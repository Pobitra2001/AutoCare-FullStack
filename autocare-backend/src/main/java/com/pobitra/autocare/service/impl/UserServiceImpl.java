package com.pobitra.autocare.service.impl;

import com.pobitra.autocare.dto.ChangePasswordRequestDTO;
import com.pobitra.autocare.dto.RegisterRequestDTO;
import com.pobitra.autocare.dto.UpdateProfileRequestDTO;
import com.pobitra.autocare.dto.UserProfileResponseDTO;
import com.pobitra.autocare.entity.Customer;
import com.pobitra.autocare.entity.User;
import com.pobitra.autocare.enums.Role;
import com.pobitra.autocare.exception.DuplicateResourceException;
import com.pobitra.autocare.exception.ResourceNotFoundException;
import com.pobitra.autocare.repository.CustomerRepository;
import com.pobitra.autocare.repository.UserRepository;
import com.pobitra.autocare.service.EmailService;
import com.pobitra.autocare.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public UserServiceImpl(
            UserRepository userRepository,
            CustomerRepository customerRepository,
            PasswordEncoder passwordEncoder,
            EmailService emailService) {

        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Override
    public User register(RegisterRequestDTO dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException("Email already exists.");
        }

        if (customerRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new DuplicateResourceException("Customer email already exists.");
        }

        User user = new User();

        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());

        User savedUser = userRepository.save(user);

        if (savedUser.getRole() == Role.CUSTOMER) {

            Customer customer = new Customer();

            customer.setName(dto.getFullName());
            customer.setEmail(dto.getEmail());
            customer.setPhone(dto.getPhone());
            customer.setAddress(dto.getAddress());

            customerRepository.save(customer);
        }

        try {
            emailService.sendEmail(
                    savedUser.getEmail(),
                    "Welcome to AutoCare",
                    """
                    Hello %s,

                    Welcome to AutoCare!

                    Your account has been created successfully.

                    You can now log in and start using AutoCare.

                    We are delighted to have you as a part of our AutoCare family.

                    Regards,
                    AutoCare Team
                    """.formatted(savedUser.getFullName())
            );
        } catch (Exception e) {
            e.printStackTrace();
        }

        return savedUser;
    }

    @Override
    public User findByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found."));
    }

    @Override
    public UserProfileResponseDTO getProfile(String email) {

        User user = findByEmail(email);

        return mapToProfileDTO(user);
    }

    @Override
    public UserProfileResponseDTO updateProfile(
            String email,
            UpdateProfileRequestDTO dto) {

        User user = findByEmail(email);

        user.setFullName(dto.getFullName());

        User updatedUser = userRepository.save(user);

        return mapToProfileDTO(updatedUser);
    }

    @Override
    public void changePassword(
            String email,
            ChangePasswordRequestDTO dto) {

        User user = findByEmail(email);

        if (!passwordEncoder.matches(
                dto.getCurrentPassword(),
                user.getPassword())) {

            throw new IllegalArgumentException(
                    "Current password is incorrect.");
        }

        if (!dto.getNewPassword().equals(
                dto.getConfirmPassword())) {

            throw new IllegalArgumentException(
                    "New password and confirm password do not match.");
        }

        user.setPassword(
                passwordEncoder.encode(dto.getNewPassword()));

        userRepository.save(user);
    }

    private UserProfileResponseDTO mapToProfileDTO(User user) {

        UserProfileResponseDTO dto = new UserProfileResponseDTO();

        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setCreatedAt(user.getCreatedAt());

        return dto;
    }
}