package org.heymouad.focusapp.exceptions;

public class HabitServiceException extends HabitException {
    public HabitServiceException(String message) {
        super(message);
    }
    public HabitServiceException(String message, Throwable cause) {
      super(message, cause);
    }
}
