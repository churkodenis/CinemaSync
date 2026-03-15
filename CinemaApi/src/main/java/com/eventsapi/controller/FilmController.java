package com.eventsapi.controller;

import com.eventsapi.DTO.FilmDTO;
import com.eventsapi.model.FilmEntity;
import com.eventsapi.repository.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/films")
@CrossOrigin(origins = "*")
public class FilmController {

    @Autowired
    private FilmRepository filmRepository;

    @GetMapping
    public ResponseEntity<List<FilmDTO>> getFilms() {
        List<FilmEntity> films = filmRepository.findAll();
        if (films.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<FilmDTO> newFilms = new ArrayList<>();
        for (FilmEntity film : films) {
            FilmDTO filmDTO = new FilmDTO();
            filmDTO.setId(film.getId());
            filmDTO.setTitle(film.getTitle());
            filmDTO.setDescription(film.getDescription());
            filmDTO.setCreatedAt(film.getCreatedAt());
            filmDTO.setDuration(film.getDuration());
            filmDTO.setPlaces(film.getPlaces());
            filmDTO.setTime(film.getTime());
            filmDTO.setPrice(film.getPrice());
            filmDTO.setTags(film.getTags());
            filmDTO.setImageUrl(film.getImageUrl());
            newFilms.add(filmDTO);
        }
        return ResponseEntity.ok(newFilms);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FilmDTO> getFilmById(@PathVariable String id) {
        Optional<FilmEntity> film = filmRepository.findById(id);
        if (film.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        FilmEntity f = film.get();
        FilmDTO filmDTO = new FilmDTO();
        filmDTO.setId(f.getId());
        filmDTO.setTitle(f.getTitle());
        filmDTO.setDescription(f.getDescription());
        filmDTO.setCreatedAt(f.getCreatedAt());
        filmDTO.setDuration(f.getDuration());
        filmDTO.setPlaces(f.getPlaces());
        filmDTO.setTime(f.getTime());
        filmDTO.setPrice(f.getPrice());
        filmDTO.setTags(f.getTags());
        filmDTO.setImageUrl(f.getImageUrl());
        return ResponseEntity.ok(filmDTO);
    }

    @PostMapping
    public ResponseEntity<FilmEntity> createFilm(@RequestBody FilmEntity film) {
        FilmEntity newFilm = filmRepository.save(film);
        return ResponseEntity.ok(newFilm);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FilmEntity> updateFilm(
            @PathVariable String id,
            @RequestBody FilmEntity updatedFilm
    ) {
        Optional<FilmEntity> existingFilm = filmRepository.findById(id);
        if (existingFilm.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        FilmEntity film = existingFilm.get();
        film.setTitle(updatedFilm.getTitle());
        film.setDescription(updatedFilm.getDescription());
        film.setDuration(updatedFilm.getDuration());
        film.setPlaces(updatedFilm.getPlaces());
        film.setTime(updatedFilm.getTime());
        film.setPrice(updatedFilm.getPrice());
        film.setTags(updatedFilm.getTags());
        film.setImageUrl(updatedFilm.getImageUrl());
        FilmEntity savedFilm = filmRepository.save(film);
        return ResponseEntity.ok(savedFilm);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFilm(@PathVariable String id) {
        Optional<FilmEntity> film = filmRepository.findById(id);
        if (film.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        filmRepository.delete(film.get());
        return ResponseEntity.noContent().build();
    }
}