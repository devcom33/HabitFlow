package org.heymouad.focusapp.mappers;


import org.heymouad.focusapp.dtos.HabitDto;
import org.heymouad.focusapp.dtos.HabitResponse;
import org.heymouad.focusapp.entities.Habit;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HabitMapper {
    Habit toHabit(HabitDto habitDto);
    HabitDto toHabitDto(Habit habit);
    HabitResponse toHabitResponse(Habit habit);
}
