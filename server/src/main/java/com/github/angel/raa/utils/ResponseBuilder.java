package com.github.angel.raa.utils;

import org.jetbrains.annotations.NotNull;

import java.time.LocalDateTime;

public class ResponseBuilder {
    private ResponseBuilder() {
    }

    @NotNull
    public static <T> Response<T> buildResponse(T data, String message, boolean success, int status) {
        Response<T> response = new Response<>();
        response.setData(data);
        response.setMessage(message);
        response.setSuccess(success);
        response.setStatus(status);
        response.setTimestamp(LocalDateTime.now());
        return response;
    }

}
