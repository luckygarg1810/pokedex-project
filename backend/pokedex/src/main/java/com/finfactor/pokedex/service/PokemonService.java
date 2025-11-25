package com.finfactor.pokedex.service;

import com.finfactor.pokedex.dto.PokemonDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PokemonService {

    private final CacheService cacheService;
    private final PokeApiService pokeApiService;

    public PokemonDTO searchPokemon(String name) {
        // Check cache first
        PokemonDTO cached = cacheService.get(name);
        if (cached != null) {
            return cached;
        }

        // Fetch from API if not cached
        PokemonDTO pokemon = pokeApiService.fetchFromApi(name);

        // Save to cache
        cacheService.save(name, pokemon);

        return pokemon;
    }
}
