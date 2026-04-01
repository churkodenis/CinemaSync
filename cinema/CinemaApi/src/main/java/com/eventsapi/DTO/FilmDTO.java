package com.eventsapi.DTO;

import java.util.ArrayList;

public class FilmDTO {
    private String id;
    private String title;
    private String description;
    private Integer duration;
    private Integer places;
    private String time;
    private String price;
    private String createdAt;
    private ArrayList<String> tags;
    private String imageUrl;  

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }

    public Integer getPlaces() { return places; }
    public void setPlaces(Integer places) { this.places = places; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public ArrayList<String> getTags() { return tags; }
    public void setTags(ArrayList<String> tags) { this.tags = tags; }

    public String getImageUrl() { return imageUrl; }     
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }  
}