package com.finfactor.pokedex.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PokemonDTO implements Serializable {
    private String name;
    private Integer id;
    private String image;
    private Integer height;
    private Integer weight;
    private List<String> abilities;
    private List<String> types;
}

