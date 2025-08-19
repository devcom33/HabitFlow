package org.heymouad.focusapp.exceptions;

public abstract class HabitException extends Exception {
    public HabitException(String message) {
        super(message);
    }

    public HabitException(String message, Throwable cause) {
        super(message, cause);
    }
}
