package com.finfactor.pokedex.service;

import com.finfactor.pokedex.dto.PokemonDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class CacheService {

    private final RedisTemplate<String, Object> redisTemplate;

    @Value("${cache.ttl}")
    private long cacheTtl;

    private static final String CACHE_PREFIX = "pokemon:";

    public PokemonDTO get(String name) {
        String key = CACHE_PREFIX + name.toLowerCase();
        Object cached = redisTemplate.opsForValue().get(key);

        if (cached != null) {
            log.info("Cache HIT for pokemon: {}", name);
            return (PokemonDTO) cached;
        }

        log.info("Cache MISS for pokemon: {}", name);
        return null;
    }

    public void save(String name, PokemonDTO pokemon) {
        String key = CACHE_PREFIX + name.toLowerCase();
        redisTemplate.opsForValue().set(key, pokemon, cacheTtl, TimeUnit.SECONDS);
        log.info("Cached pokemon: {} with TTL: {}s", name, cacheTtl);
    }
}