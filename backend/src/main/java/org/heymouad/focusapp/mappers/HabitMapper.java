package org.heymouad.focusapp.mappers;


import org.heymouad.focusapp.dtos.HabitRequestDto;
import org.heymouad.focusapp.entities.Habit;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HabitMapper {
    Habit toHabit(HabitRequestDto habitRequestDto);
}
