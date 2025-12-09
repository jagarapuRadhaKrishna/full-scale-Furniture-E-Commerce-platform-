package com.dfw.furniture.service;

import com.dfw.furniture.dto.AuthResponse;
import com.dfw.furniture.dto.LoginRequest;
import com.dfw.furniture.dto.RegisterRequest;
import com.dfw.furniture.model.User;
import com.dfw.furniture.repository.UserRepository;
import com.dfw.furniture.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Create new user
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .role(User.Role.USER)
                .status(User.Status.ACTIVE)
                .isVerified(false)
                .emailVerified(false)
                .phoneVerified(false)
                .build();

        userRepository.save(user);

        // Generate tokens
        String token = jwtTokenProvider.generateToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);

        return AuthResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .email(user.getEmail())
                .role(user.getRole().name())
                .message("Registration successful")
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        // Authenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Get user
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update last login
        user.setLastLogin(java.time.LocalDateTime.now());
        userRepository.save(user);

        // Generate tokens
        String token = jwtTokenProvider.generateToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);

        return AuthResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .email(user.getEmail())
                .role(user.getRole().name())
                .message("Login successful")
                .build();
    }
}
