package org.heymouad.focusapp.exceptions;

public class HabitNotFoundException extends HabitException {
    public HabitNotFoundException(String message) {
        super(message);
    }

    public HabitNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
