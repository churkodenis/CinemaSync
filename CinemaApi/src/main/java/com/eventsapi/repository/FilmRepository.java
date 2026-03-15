package com.eventsapi.repository;

import com.eventsapi.model.FilmEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface FilmRepository extends MongoRepository<FilmEntity, String> { 
    List<FilmEntity> findByTitleContainingIgnoreCase(String title);
}