package com.finfactor.pokedex.service;

import com.finfactor.pokedex.dto.PokeApiResponse;
import com.finfactor.pokedex.dto.PokemonDTO;
import com.finfactor.pokedex.exception.PokemonNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PokeApiService {

    private final WebClient webClient;

    @Value("${pokeapi.base-url}")
    private String baseUrl;

    public PokemonDTO fetchFromApi(String name) {
        log.info("Fetching pokemon from PokeAPI: {}", name);

        try {
            PokeApiResponse response = webClient.get()
                    .uri(baseUrl + "/" + name.toLowerCase())
                    .retrieve()
                    .onStatus(status -> status.value() == 404,
                            clientResponse -> Mono.error(new PokemonNotFoundException(name)))
                    .bodyToMono(PokeApiResponse.class)
                    .block();

            assert response != null;
            return mapToDTO(response);
        } catch (Exception e) {
            if (e.getCause() instanceof PokemonNotFoundException) {
                throw (PokemonNotFoundException) e.getCause();
            }
            throw new PokemonNotFoundException(name);
        }
    }

    private PokemonDTO mapToDTO(PokeApiResponse response) {
        List<String> abilities = response.getAbilities().stream()
                .map(a -> a.getAbility().getName())
                .collect(Collectors.toList());

        List<String> types = response.getTypes().stream()
                .map(t -> t.getType().getName())
                .collect(Collectors.toList());

        return new PokemonDTO(
                response.getName(),
                response.getId(),
                response.getSprites().getFront_default(),
                response.getHeight(),
                response.getWeight(),
                abilities,
                types
        );
    }
}