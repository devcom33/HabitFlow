package org.heymouad.focusapp.repositories;

import org.heymouad.focusapp.dtos.CompletionStatsDTO;
import org.heymouad.focusapp.dtos.HabitCompletionCountDTO;
import org.heymouad.focusapp.entities.AppUser;
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
    List<HabitCompletion> findHabitCompletionByCompletionDateAndAppUser(LocalDate completionDate, AppUser appUser);
    List<HabitCompletion> findHabitCompletionByHabit_IdAndAppUser(Long HabitId, AppUser appUser);
    boolean existsByHabitAndCompletionDate(Habit habit, LocalDate date);
    @Query("""
        SELECT h FROM HabitCompletion h
            WHERE (:category IS NULL OR h.habit.category.name = :category)
                AND h.completionDate = :date AND h.appUser = :appuser
    """)
    Page<HabitCompletion> findByCategoryAndDateAndAppUser(@Param("category") String category, @Param("date") LocalDate date, @Param("appuser") AppUser appUser, Pageable pageable);

    @Query("""
        SELECT new org.heymouad.focusapp.dtos.HabitCompletionCountDTO(h.completionDate, COUNT(h))
            FROM HabitCompletion h
                WHERE h.completionDate >= :startDate AND h.completed = true AND h.appUser = :appUser
                    GROUP BY h.completionDate
                        ORDER BY h.completionDate
    """
    )
    List<HabitCompletionCountDTO> findRecentHabitCompletionCounts(@Param("startDate") LocalDate startDate, @Param("appUser") AppUser appUser);

    @Query("""
    SELECT new org.heymouad.focusapp.dtos.CompletionStatsDTO(
        SUM(CASE WHEN h.completed = true THEN 1 ELSE 0 END),
        COUNT(h)
    )
    FROM HabitCompletion h
    WHERE h.completionDate = :date AND h.appUser = :appUser
""")
    CompletionStatsDTO findCompletionStats(@Param("date") LocalDate date, @Param("appUser") AppUser appUser);

    @Query("""
    SELECT COUNT(h), h.habit.category.name FROM HabitCompletion h WHERE (h.completionDate >= :startDate AND h.appUser = :appUser AND h.completed = true) GROUP BY h.habit.category
""")
    Object [] findCategoryStats(@Param("startDate") LocalDate startDate, @Param("appUser") AppUser appUser );
}
