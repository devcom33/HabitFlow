package org.heymouad.focusapp.repositories;

import org.heymouad.focusapp.dtos.CompletionStatsDTO;
import org.heymouad.focusapp.dtos.HabitCompletionCountDTO;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface HabitCompletionRepository extends JpaRepository<HabitCompletion, Long> {
    List<HabitCompletion> findHabitCompletionByCompletionDate(LocalDate completionDate);
    List<HabitCompletion> findHabitCompletionByHabit_Id(Long HabitId);
    boolean existsByHabitAndCompletionDate(Habit habit, LocalDate date);
    @Query("""
        SELECT h FROM HabitCompletion h
            WHERE (:category IS NULL OR h.habit.category.name = :category)
                AND h.completionDate = :date
    """)
    Page<HabitCompletion> findByCategoryAndDate(@Param("category") String category, @Param("date") LocalDate date, Pageable pageable);

    @Query("""
        SELECT new org.heymouad.focusapp.dtos.HabitCompletionCountDTO(h.completionDate, COUNT(h))
            FROM HabitCompletion h
                WHERE h.completionDate >= :startDate AND h.completed = true
                    GROUP BY h.completionDate
                        ORDER BY h.completionDate
    """
    )
    List<HabitCompletionCountDTO> findRecentHabitCompletionCounts(@Param("startDate") LocalDate startDate);

    @Query("""
    SELECT new org.heymouad.focusapp.dtos.CompletionStatsDTO(
        SUM(CASE WHEN h.completed = true THEN 1 ELSE 0 END),
        COUNT(h)
    )
    FROM HabitCompletion h
    WHERE h.completionDate = :date
""")
    CompletionStatsDTO findCompletionStats(@Param("date") LocalDate date);

    @Query("""
    SELECT COUNT(h), h.habit.category.name FROM HabitCompletion h WHERE (h.completionDate >= :startDate AND h.completed = true) GROUP BY h.habit.category
""")
    Object [] findCategoryStats(@Param("startDate") LocalDate startDate);
}
