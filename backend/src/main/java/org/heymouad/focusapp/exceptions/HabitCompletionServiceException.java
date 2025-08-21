package org.heymouad.focusapp.exceptions;

public class HabitCompletionServiceException extends HabitException {
    public HabitCompletionServiceException(String message) {
        super(message);
    }

    public HabitCompletionServiceException(String message, Throwable cause)
    {
      super(message, cause);
    }
}
