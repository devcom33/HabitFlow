package org.heymouad.focusapp.mappers;


import org.heymouad.focusapp.dtos.ActivityLogRequestDto;
import org.heymouad.focusapp.entities.ActivityLog;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ActivityLogMapper {

    ActivityLog toActivityLog(ActivityLogRequestDto activityLogRequestDto);
}
