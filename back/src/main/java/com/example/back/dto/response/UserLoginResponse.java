package com.example.back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserLoginResponse {
    private String userId;
    private String token;
    private UserInfoResponse userInfo;
    private String message;
}
