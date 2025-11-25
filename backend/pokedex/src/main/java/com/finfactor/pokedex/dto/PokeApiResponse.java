package com.finfactor.pokedex.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PokeApiResponse implements Serializable {
    private String name;
    private Integer id;
    private Integer height;
    private Integer weight;
    private Sprites sprites;
    private List<AbilityWrapper> abilities;
    private List<TypeWrapper> types;
}