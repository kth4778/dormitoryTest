package com.example.back.service;

import com.example.back.domain.Notice;
import com.example.back.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public List<Notice> getRecentNotices() {
        return noticeRepository.findTop5ByOrderByDateDesc();
    }
}
