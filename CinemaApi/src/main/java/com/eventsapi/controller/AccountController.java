package com.eventsapi.controller;

import com.eventsapi.DTO.LoginDTO;
import com.eventsapi.DTO.RegisterDTO;
import com.eventsapi.model.UserEntity;
import com.eventsapi.repository.UserRepository;
import com.nimbusds.jose.jwk.source.ImmutableSecret;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
<<<<<<< HEAD
import com.eventsapi.DTO.ChangePasswordDTO;
=======
>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d

import java.time.Instant;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AccountController {
    @Value(value = "${JWT_SECRET}")
    private String jwtSecretKey;

    @Value(value = "${JWT_ISSUER}")
    private String jwtIssuer;

    @Value(value = "${JWT_EXPIRATION}")
    private int jwtExpiration;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@Valid @RequestBody LoginDTO loginDTO, BindingResult result) {
        if (result.hasErrors()) {
            var errorsList = result.getAllErrors();
            var errorsMap = new HashMap<String, String>();
<<<<<<< HEAD
=======

>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
            for (int i = 0; i < errorsList.size(); i++) {
                var error = (FieldError) errorsList.get(i);
                errorsMap.put(error.getField(), error.getDefaultMessage());
            }
<<<<<<< HEAD
            return ResponseEntity.badRequest().body(errorsMap);
        }
=======

            return ResponseEntity.badRequest().body(errorsMap);
        }

>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDTO.getEmail(), loginDTO.getPassword()));
<<<<<<< HEAD
=======

>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
            Optional<UserEntity> optionalUser = userRepository.findByEmail(loginDTO.getEmail());
            if (optionalUser.isPresent()) {
                UserEntity user = optionalUser.get();
                String jwtToken = createJWTToken(user);
<<<<<<< HEAD
                var response = new HashMap<String, Object>();
                response.put("token", jwtToken);
                response.put("user", user);
=======

                var response = new HashMap<String, Object>();
                response.put("token", jwtToken);
                response.put("user", user);

>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body("User not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
<<<<<<< HEAD
=======

>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
        return ResponseEntity.badRequest().body("Invalid email or password");
    }

    @GetMapping("/profile")
    public ResponseEntity<Object> profile(Authentication auth) {
        Optional<UserEntity> optionalUser = userRepository.findByUsername(auth.getName());
<<<<<<< HEAD
=======

>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            var response = new HashMap<String, Object>();
            response.put("User", user);
            response.put("Authorities", auth.getAuthorities());
<<<<<<< HEAD
=======

>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }
    }

    @PostMapping("/book-ticket/{filmId}")
    public ResponseEntity<Object> bookTicket(Authentication auth, @PathVariable String filmId) {
        Optional<UserEntity> optionalUser = userRepository.findByUsername(auth.getName());
<<<<<<< HEAD
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            if (user.getTickets() == null) {
                user.setTickets(new HashSet<>());
            }
            user.getTickets().add(filmId);
            try {
                userRepository.save(user);
                var response = new HashMap<String, Object>();
                response.put("message", "Ticket booked successfully");
                response.put("tickets", user.getTickets());
=======

        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();

            if (user.getTickets() == null) {
                user.setTickets(new HashSet<>());
            }

            user.getTickets().add(filmId);

            try {
                userRepository.save(user);

                var response = new HashMap<String, Object>();
                response.put("message", "Ticket booked successfully");
                response.put("tickets", user.getTickets());

>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
                return ResponseEntity.ok(response);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.internalServerError().body("Error while booking ticket");
            }
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }
    }

<<<<<<< HEAD
    @DeleteMapping("/cancel-ticket/{filmId}")
    public ResponseEntity<Object> cancelTicket(Authentication auth, @PathVariable String filmId) {
        Optional<UserEntity> optionalUser = userRepository.findByUsername(auth.getName());
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            if (user.getTickets() == null || !user.getTickets().contains(filmId)) {
                return ResponseEntity.badRequest().body("Ticket not found");
            }
            user.getTickets().remove(filmId);
            try {
                userRepository.save(user);
                var response = new HashMap<String, Object>();
                response.put("message", "Ticket cancelled successfully");
                response.put("tickets", user.getTickets());
                return ResponseEntity.ok(response);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.internalServerError().body("Error while cancelling ticket");
            }
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }
    }

    @PostMapping("/make-admin/{userId}")
    public ResponseEntity<Object> makeAdmin(@PathVariable String userId, Authentication auth) {
=======
<<<<<<< HEAD
<<<<<<< HEAD
    @PostMapping("/make-admin/{userId}")
    public ResponseEntity<Object> makeAdmin(@PathVariable String userId, Authentication auth) {
        // Тільки адмін може видавати роль адміна
>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("SCOPE_ADMIN"));
        if (!isAdmin) {
            return ResponseEntity.status(403).body("Access denied");
        }
<<<<<<< HEAD
=======

>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }
<<<<<<< HEAD
        UserEntity user = optionalUser.get();
        user.getRoles().add("ADMIN");
        userRepository.save(user);
        return ResponseEntity.ok("User promoted to ADMIN");
    }

    @PostMapping("/change-password")
public ResponseEntity<Object> changePassword(
        Authentication auth,
        @Valid @RequestBody ChangePasswordDTO dto,
        BindingResult result) {

    if (result.hasErrors()) {
        var errorsMap = new HashMap<String, String>();
        for (var error : result.getAllErrors()) {
            errorsMap.put(((FieldError) error).getField(), error.getDefaultMessage());
        }
        return ResponseEntity.badRequest().body(errorsMap);
    }

    Optional<UserEntity> optionalUser = userRepository.findByUsername(auth.getName());
    if (optionalUser.isEmpty()) {
        return ResponseEntity.badRequest().body("User not found");
    }

    UserEntity user = optionalUser.get();
    var encoder = new BCryptPasswordEncoder();

    
    if (!encoder.matches(dto.getOldPassword(), user.getPassword())) {
        return ResponseEntity.badRequest().body("Невірний старий пароль");
    }

   
    user.setPassword(encoder.encode(dto.getNewPassword()));
    userRepository.save(user);

    return ResponseEntity.ok("Пароль успішно змінено");
}

    @PostMapping("/register")
=======

        UserEntity user = optionalUser.get();
        user.getRoles().add("ADMIN");
        userRepository.save(user);

        return ResponseEntity.ok("User promoted to ADMIN");
    }
=======
>>>>>>> 920c5f6ebefdcfb1274a234f5ea99bfa9746d5a3
=======
>>>>>>> e34e72f91523afd032276db66ccd3c28d4cb8d01


>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
    public ResponseEntity<Object> register(@Valid @RequestBody RegisterDTO registerDTO, BindingResult result) {
        if (result.hasErrors()) {
            var errorsList = result.getAllErrors();
            var errorsMap = new HashMap<String, String>();
<<<<<<< HEAD
=======

>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
            for (int i = 0; i < errorsList.size(); i++) {
                var error = (FieldError) errorsList.get(i);
                errorsMap.put(error.getField(), error.getDefaultMessage());
            }
<<<<<<< HEAD
            return ResponseEntity.badRequest().body(errorsMap);
        }
        var bCryptPasswordEncoder = new BCryptPasswordEncoder();
=======

            return ResponseEntity.badRequest().body(errorsMap);
        }

        var bCryptPasswordEncoder = new BCryptPasswordEncoder();

>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
        UserEntity user = new UserEntity();
        user.setEmail(registerDTO.getEmail());
        user.setUsername(registerDTO.getUsername());
        user.setPassword(bCryptPasswordEncoder.encode(registerDTO.getPassword()));
        user.setRoles(new HashSet<>(Set.of("USER")));
<<<<<<< HEAD
=======

>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
        try {
            var otherUser = userRepository.findByEmail(user.getEmail());
            if (otherUser.isPresent()) {
                return ResponseEntity.badRequest().body("Email already exist");
            }
<<<<<<< HEAD
            userRepository.save(user);
            String jwtToken = createJWTToken(user);
            var response = new HashMap<String, Object>();
            response.put("token", jwtToken);
            response.put("user", user);
=======

            userRepository.save(user);
            String jwtToken = createJWTToken(user);

            var response = new HashMap<String, Object>();
            response.put("token", jwtToken);
            response.put("user", user);

>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Error while saving user");
    }

    private String createJWTToken(UserEntity user) {
        Instant now = Instant.now();
<<<<<<< HEAD
=======

>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .subject(user.getUsername())
                .issuer(jwtIssuer)
                .issuedAt(now)
                .expiresAt(now.plusSeconds(jwtExpiration))
<<<<<<< HEAD
                .claim("scope", user.getRoles())
=======
                .claim("roles", user.getRoles())
>>>>>>> d979d73eb7ce62173e997dcdece9eb8836c8312d
                .build();
        var encoder = new NimbusJwtEncoder(new ImmutableSecret<>(jwtSecretKey.getBytes()));
        var params = JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(), claims);
        return encoder.encode(params).getTokenValue();
    }
}