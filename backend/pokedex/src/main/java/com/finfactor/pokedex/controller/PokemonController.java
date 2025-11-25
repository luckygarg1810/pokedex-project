package com.finfactor.pokedex.controller;

import com.finfactor.pokedex.dto.PokemonDTO;
import com.finfactor.pokedex.service.PokemonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pokemon")
@RequiredArgsConstructor
public class PokemonController {

    private final PokemonService pokemonService;

    @GetMapping("/{name}")
    public ResponseEntity<PokemonDTO> getPokemon(@PathVariable String name) {
        PokemonDTO pokemon = pokemonService.searchPokemon(name);
        return ResponseEntity.ok(pokemon);
    }
}
