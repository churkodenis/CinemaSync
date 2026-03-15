package com.eventsapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;

@Document(collection = "films")
public class FilmEntity {
    @Id
    private String id;

    @Field("title")
    private String title;

    @Field("description")
    private String description;

    @Field("duration")
    private Integer duration;

    @Field("places")
    private Integer places;

    @Field("time")
    private String time;

    @Field("price")
    private String price;

    @Field("createdAt")
    private String createdAt;

    @Field("tags")
    private ArrayList<String> tags;

    @Field("imageUrl")
    private String imageUrl;   

    public FilmEntity() {}

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