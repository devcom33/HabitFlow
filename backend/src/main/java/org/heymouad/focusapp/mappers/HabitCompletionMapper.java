package org.heymouad.focusapp.mappers;


import org.heymouad.focusapp.dtos.HabitCompletionDto;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HabitCompletionMapper {
    HabitCompletion toHabitCompletion(HabitCompletionDto habitCompletionDto);
    HabitCompletionDto toHabitCompletionDto(HabitCompletion habitCompletion);
}
