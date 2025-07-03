package com.example.back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserInfoResponse {
    private Long id;
    private String email;
    private String name;
    private String phone;
    private String studentNum;
    private String college;
    private String major;
    private String profileImageUrl;
}
