//package com.example.demospringsecurity.controller;
//
//import com.example.demospringsecurity.dto.request.LoginRequestDTO;
//import com.example.demospringsecurity.dto.request.RegisterRequestDTO;
//import com.example.demospringsecurity.dto.response.LoginResponse;
//import com.example.demospringsecurity.dto.response.UserResponse;
//import com.example.demospringsecurity.model.User;
//import com.example.demospringsecurity.service.SignupService;
//import com.example.demospringsecurity.service.UserService;
//import com.example.demospringsecurity.mapper.SecurityUtil;
//import com.example.demospringsecurity.service.ApiMessage;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseCookie;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.AccessDeniedException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.oauth2.jwt.Jwt;
//import org.springframework.web.bind.annotation.*;
//
//
//@RestController
//@RequiredArgsConstructor
//@Slf4j
//@RequestMapping("/api/v1/auth")
//public class AuthController {
//    private final AuthenticationManagerBuilder authenticationManagerBuilder;
//    private final SecurityUtil securityUtil;
//    private final UserService userService;
//    private final SignupService signupService;
//    @Value("${app.jwt.refresh-token-validity-in-seconds}")
//    private long refreshTokenExpiration;
//
//    @PostMapping("/login")
//    @ApiMessage("Login successfully")
//    public ResponseEntity<?> auth(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
//        log.info("Login request: {}", loginRequestDTO);
//        UsernamePasswordAuthenticationToken authenticationToken
//                = new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(), loginRequestDTO.getPassword());
//        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        LoginResponse loginResponse = new LoginResponse();
//        User currentUser = userService.findByEmail(loginRequestDTO.getUsername());
//        if (currentUser != null) {
//            if (!currentUser.isEnabled()) {
//                throw new RuntimeException("User is not enabled, please find our mail in your mail: " + loginRequestDTO.getUsername() +" and click");
//            }
//            LoginResponse.UserLogin userLogin = new
//                    LoginResponse.UserLogin(currentUser.getId(), currentUser.getEmail(), currentUser.getName(), currentUser.getRole());
//            loginResponse.setUser(userLogin);
//        }
//        String accessToken = securityUtil.createAccessToken(authentication.getName(), loginResponse);
//        loginResponse.setAccessToken(accessToken);
//        String refreshToken = securityUtil.createRefreshToken(loginRequestDTO.getUsername(), loginResponse);
//        userService.updateUserToken(refreshToken, loginRequestDTO.getUsername());
//        ResponseCookie responseCookie = ResponseCookie.from("refresh_token", refreshToken)
//                .httpOnly(true)
//                .secure(true)
//                .path("/")
//                .maxAge(refreshTokenExpiration)
//                .build();
//        return ResponseEntity.status(HttpStatus.OK)
//                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
//                .body(loginResponse);
//    }
//
//    @GetMapping("/account")
//    @ApiMessage("Get account message")
//    public ResponseEntity<?> getAccount() {
//        String email = SecurityUtil.getCurrentUserLogin().orElse("");
//        User currentUser = userService.findByEmail(email);
//        LoginResponse.UserLogin userLogin = new LoginResponse.UserLogin();
//        if (currentUser != null) {
//            userLogin.setId(currentUser.getId());
//            userLogin.setEmail(currentUser.getEmail());
//            userLogin.setName(currentUser.getName());
//            userLogin.setRole(currentUser.getRole());
//        }
//        return ResponseEntity.ok().body(userLogin);
//    }
//
//    @GetMapping("/refresh")
//    @ApiMessage("Get user by refresh token")
//    public ResponseEntity<?> getRefreshToken(@CookieValue(name = "refresh_token", defaultValue = "abc") String refresh_token) {
//        log.info("Call refresh_token");
//        if (refresh_token.equals("abc")) {
//            throw new AccessDeniedException("Ko co refresh token trong cookies");
//        }
//        Jwt decodedToken = securityUtil.checkValidRefreshToken(refresh_token);
//        String email = decodedToken.getSubject();
//        User currentUser = userService.getUserByEmailAndRefreshToken(email, refresh_token);
//        if (currentUser == null) {
//            throw new AccessDeniedException("Truy cap khong hop le");
//        }
//        LoginResponse loginResponse = new LoginResponse();
//        User currentUserDB = userService.findByEmail(email);
//        if (currentUserDB != null) {
//            LoginResponse.UserLogin userLogin = new
//                    LoginResponse.UserLogin(currentUserDB.getId(), currentUserDB.getEmail(), currentUserDB.getName(), currentUserDB.getRole());
//            loginResponse.setUser(userLogin);
//        }
//        String accessToken = securityUtil.createAccessToken(email, loginResponse);
//        loginResponse.setAccessToken(accessToken);
//        String newRefreshToken = securityUtil.createRefreshToken(email, loginResponse);
//        userService.updateUserToken(newRefreshToken, email);
//        ResponseCookie responseCookie = ResponseCookie
//                .from("refresh_token", newRefreshToken)
//                .httpOnly(true)
//                .secure(true)
//                .path("/")
//                .maxAge(refreshTokenExpiration)
//                .build();
//        return ResponseEntity.status(HttpStatus.OK)
//                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
//                .body(loginResponse);
//    }
//
//    @PostMapping("/logout")
//    @ApiMessage("Logout user")
//    public ResponseEntity<Void> logout() {
//        String email = SecurityUtil.getCurrentUserLogin().orElse("");
//        if (email.isEmpty()) {
//            throw new AccessDeniedException("Access token khong hop le");
//        }
//        userService.updateUserToken(null, email);
//        ResponseCookie deleteSpringCookies = ResponseCookie
//                .from("refresh_token", "")
//                .httpOnly(true)
//                .secure(true)
//                .path("/")
//                .maxAge(0)
//                .build();
//        return ResponseEntity.ok()
//                .header(HttpHeaders.SET_COOKIE, deleteSpringCookies.toString())
//                .body(null);
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDTO registerRequestDTO) {
//        log.info("Create user : {}", registerRequestDTO);
//        UserResponse userResponse = signupService.register(registerRequestDTO);
//        return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
//    }
//
//}
package com.example.demospringsecurity.dto.response.order;

import com.example.demospringsecurity.dto.request.LoginRequestDTO;
import com.example.demospringsecurity.dto.request.RegisterRequestDTO;
import com.example.demospringsecurity.dto.response.LoginResponse;
import com.example.demospringsecurity.dto.response.UserResponse;
import com.example.demospringsecurity.model.User;
import com.example.demospringsecurity.service.SignupService;
import com.example.demospringsecurity.service.UserService;
import com.example.demospringsecurity.mapper.SecurityUtil;
import com.example.demospringsecurity.service.ApiMessage;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final SecurityUtil securityUtil;
    private final UserService userService;
    private final SignupService signupService;
    @Value("${app.jwt.refresh-token-validity-in-seconds}")
    private long refreshTokenExpiration;

    @PostMapping("/login")
    @ApiMessage("Login successfully")
    public ResponseEntity<?> auth(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        log.info("Login request: {}", loginRequestDTO);
        UsernamePasswordAuthenticationToken authenticationToken
                = new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(), loginRequestDTO.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        LoginResponse loginResponse = new LoginResponse();
        User currentUser = userService.findByEmail(loginRequestDTO.getUsername());
        if (currentUser != null) {
            if (!currentUser.isEnabled()) {
                throw new RuntimeException("User is not enabled, please find our mail in your mail: " + loginRequestDTO.getUsername() +" and click");
            }
            LoginResponse.UserLogin userLogin = new
                    LoginResponse.UserLogin(currentUser.getId(), currentUser.getEmail(), currentUser.getName(), currentUser.getFirstName(), currentUser.getRole());
            loginResponse.setUser(userLogin);
        }
        String accessToken = securityUtil.createAccessToken(authentication.getName(), loginResponse);
        loginResponse.setAccessToken(accessToken);
        String refreshToken = securityUtil.createRefreshToken(loginRequestDTO.getUsername(), loginResponse);
        userService.updateUserToken(refreshToken, loginRequestDTO.getUsername());
        ResponseCookie responseCookie = ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(refreshTokenExpiration)
                .build();
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body(loginResponse);
    }

    @GetMapping("/account")
    @ApiMessage("Get account message")
    public ResponseEntity<?> getAccount() {
        String email = SecurityUtil.getCurrentUserLogin().orElse("");
        User currentUser = userService.findByEmail(email);
        LoginResponse.UserLogin userLogin = new LoginResponse.UserLogin();
        if (currentUser != null) {
            userLogin.setId(currentUser.getId());
            userLogin.setEmail(currentUser.getEmail());
            userLogin.setName(currentUser.getName());
            userLogin.setFirstName(currentUser.getFirstName());
            userLogin.setRole(currentUser.getRole());
        }
        return ResponseEntity.ok().body(userLogin);
    }

    @GetMapping("/refresh")
    @ApiMessage("Get user by refresh token")
    public ResponseEntity<?> getRefreshToken(@CookieValue(name = "refresh_token", defaultValue = "abc") String refresh_token) {
        log.info("Call refresh_token");
        if (refresh_token.equals("abc")) {
            throw new AccessDeniedException("Please login or register");
        }
        Jwt decodedToken = securityUtil.checkValidRefreshToken(refresh_token);
        String email = decodedToken.getSubject();
        User currentUser = userService.getUserByEmailAndRefreshToken(email, refresh_token);
        if (currentUser == null) {
            throw new AccessDeniedException("Truy cap khong hop le");
        }
        LoginResponse loginResponse = new LoginResponse();
        User currentUserDB = userService.findByEmail(email);
        if (currentUserDB != null) {
            LoginResponse.UserLogin userLogin = new
                    LoginResponse.UserLogin(currentUserDB.getId(), currentUserDB.getEmail(), currentUserDB.getName(), currentUser.getFirstName(), currentUserDB.getRole());
            loginResponse.setUser(userLogin);
        }
        String accessToken = securityUtil.createAccessToken(email, loginResponse);
        loginResponse.setAccessToken(accessToken);
        String newRefreshToken = securityUtil.createRefreshToken(email, loginResponse);
        userService.updateUserToken(newRefreshToken, email);
        ResponseCookie responseCookie = ResponseCookie
                .from("refresh_token", newRefreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(refreshTokenExpiration)
                .build();
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body(loginResponse);
    }

    @PostMapping("/logout")
    @ApiMessage("Logout user")
    public ResponseEntity<Void> logout() {
        String email = SecurityUtil.getCurrentUserLogin().orElse("");
        if (email.isEmpty()) {
            throw new AccessDeniedException("Access token khong hop le");
        }
        userService.updateUserToken(null, email);
        ResponseCookie deleteSpringCookies = ResponseCookie
                .from("refresh_token", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, deleteSpringCookies.toString())
                .body(null);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDTO registerRequestDTO) {
        log.info("Create user : {}", registerRequestDTO);
        UserResponse userResponse = signupService.register(registerRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
    }

}
