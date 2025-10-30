package org.heymouad.focusapp.repositories;

import org.heymouad.focusapp.dtos.HabitCompletionDto;
import org.heymouad.focusapp.entities.Category;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface HabitCompletionRepository extends JpaRepository<HabitCompletion, Long> {
    List<HabitCompletion> findHabitCompletionByCompletionDate(LocalDate completionDate);
    List<HabitCompletion> findHabitCompletionByHabit_Id(Long HabitId);
    boolean existsByHabitAndCompletionDate(Habit habit, LocalDate date);
    Page<HabitCompletion> findAll(Pageable pageable);

    @Query("""
        SELECT new org.heymouad.focusapp.dtos.HabitCompletionCountDTO(h.completionDate, COUNT(h))
            FROM HabitCompletion h
                WHERE h.completionDate >= :startDate
                    GROUP BY h.completionDate
                        ORDER BY h.completionDate
    """
    )
    List<HabitCompletionCountDTO> findRecentHabitCompletionCounts(@Param("startDate") LocalDate startDate);

    Page<HabitCompletion> findByHabit_Category_NameAndCompletionDate(String categoryName, Pageable pageable, LocalDate now);
}
