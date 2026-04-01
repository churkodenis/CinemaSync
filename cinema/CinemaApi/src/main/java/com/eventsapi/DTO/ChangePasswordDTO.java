package com.eventsapi.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class ChangePasswordDTO {
    @NotEmpty
    private String oldPassword;

    @NotEmpty
    @Size(min = 6, message = "Новий пароль мінімум 6 символів")
    private String newPassword;

    public String getOldPassword() { return oldPassword; }
    public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }
    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}