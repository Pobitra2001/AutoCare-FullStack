package com.pobitra.autocare.config;

import com.pobitra.autocare.security.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            CustomUserDetailsService userDetailsService) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config)
            throws Exception {

        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth

                        // ===========================
                        // Public APIs
                        // ===========================
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/contact/**",
                                "/api/email/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**"
                        ).permitAll()

                        // ===========================
                        // CUSTOMER APIs
                        // ===========================
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/bookings"
                        ).hasRole("CUSTOMER")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/bookings/my-bookings"
                        ).hasRole("CUSTOMER")

                        // ===========================
                        // ADMIN & STAFF APIs
                        // ===========================
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/bookings"
                        ).hasAnyRole("ADMIN", "STAFF")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/bookings/{id}"
                        ).hasAnyRole("ADMIN", "STAFF")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/bookings/status/**"
                        ).hasAnyRole("ADMIN", "STAFF")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/bookings/**"
                        ).hasAnyRole("ADMIN", "STAFF")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/bookings/**"
                        ).hasRole("ADMIN")


                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/users/profile"
                        ).authenticated()

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/users/profile"
                        ).authenticated()

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/users/change-password"
                        ).authenticated()

                        .anyRequest()
                        .authenticated()
                )

                .userDetailsService(userDetailsService)

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}