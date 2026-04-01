package com.eventsapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.Set;

@Document(collection = "users")
public class UserEntity {
    @Id
    private String id;

    @NotEmpty
    @Size(min = 3, max = 50)
    @Field(name = "username")
    private String username;

    @NotEmpty
    @Email
    @Field(name = "email")
    private String email;

    @NotEmpty
    @Size(min = 6)
    @Field(name = "password")
    private String password;

    @Field(name = "roles")
    private Set<String> roles = new HashSet<>();

    private Set<String> tickets = new HashSet<>();

    public UserEntity() {
    }

    public UserEntity(String id, String username, String email, String password, Set<String> roles, Set<String> tickets) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.tickets = tickets;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public Set<String> getTickets() {
        return tickets;
    }

    public void setTickets(Set<String> tickets) {
        this.tickets = tickets;
    }

}