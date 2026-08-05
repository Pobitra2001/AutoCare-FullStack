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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

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
            AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth

                        // Allow all CORS preflight requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // =========================================
                        // PUBLIC APIs
                        // =========================================
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/contact/**",
                                "/api/email/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**"
                        ).permitAll()

                        // =========================================
                        // BOOKING APIs
                        // =========================================

                        // Customer
                        .requestMatchers(HttpMethod.POST, "/api/bookings")
                        .hasRole("CUSTOMER")

                        .requestMatchers(HttpMethod.GET, "/api/bookings/my-bookings")
                        .hasRole("CUSTOMER")

                        // Admin / Staff
                        .requestMatchers(HttpMethod.GET, "/api/bookings/**")
                        .hasAnyRole("ADMIN", "STAFF")

                                // Customer can cancel own booking
                                .requestMatchers(HttpMethod.PUT, "/api/bookings/*/cancel")
                                .hasRole("CUSTOMER")
                                 // Admin / Staff can update booking status
                                .requestMatchers(HttpMethod.PUT, "/api/bookings/*/status")
                                .hasAnyRole("ADMIN", "STAFF")

                        .requestMatchers(HttpMethod.DELETE, "/api/bookings/**")
                        .hasRole("ADMIN")

                        // =========================================
                        // VEHICLE APIs
                        // =========================================

                        // Customer
                        .requestMatchers(HttpMethod.POST, "/api/vehicles")
                        .hasRole("CUSTOMER")

                        .requestMatchers(HttpMethod.GET, "/api/vehicles/my/**")
                        .hasRole("CUSTOMER")

                        .requestMatchers(HttpMethod.PUT, "/api/vehicles/**")
                        .hasRole("CUSTOMER")

                        .requestMatchers(HttpMethod.DELETE, "/api/vehicles/**")
                        .hasRole("CUSTOMER")

                        // Staff / Admin
                        .requestMatchers(HttpMethod.GET, "/api/vehicles")
                        .hasAnyRole("ADMIN", "STAFF")

                        .requestMatchers(HttpMethod.GET, "/api/vehicles/*")
                        .hasAnyRole("ADMIN", "STAFF")

                        // =========================================

                        .anyRequest().authenticated()
                )

                .userDetailsService(userDetailsService)

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(List.of(
                "http://localhost:3000",
                "http://localhost:5173",
                "https://*.vercel.app"
        ));

        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}