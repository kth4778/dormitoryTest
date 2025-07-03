package com.example.back.service;

import com.example.back.domain.Meal;
import com.example.back.repository.MealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MealService {

    private final MealRepository mealRepository;

    public Optional<Meal> getTodayMeal() {
        return mealRepository.findByDate(LocalDate.now());
    }
}
