# Pokémon Search API

A Spring Boot REST API that allows searching for Pokémon data with Redis caching to optimize performance and reduce external API calls.

## Features

- Search Pokémon by name
- Redis caching for faster responses
- Clean JSON responses with essential Pokémon data
- Global exception handling
- Layered architecture (Controller → Service → Cache/API)
- Automatic cache expiration (1 hour TTL)

## Tech Stack

- **Spring Boot 3.5.8** - Application framework
- **Spring Web** - REST API
- **Spring Data Redis** - Caching layer
- **WebClient** - HTTP client for external API calls
- **Lombok** - Reduce boilerplate code
- **Jackson** - JSON serialization
- **Redis** - In-memory cache

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Redis (on Local or Redis Cloud)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pokedex
```

### 2. Start Redis

```bash
# macOS
brew install redis
brew services start redis

# Ubuntu/Debian
sudo apt-get install redis-server
sudo systemctl start redis
```

### 3. Configure Application (Optional)

Edit `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080

# PokeAPI Configuration
pokeapi.base-url=https://pokeapi.co/api/v2/pokemon

# Redis Configuration
spring.data.redis.host=localhost
spring.data.redis.port=6379

# Cache TTL (in seconds)
cache.ttl=3600
```

### 4. Build the Project

```bash
mvn clean install
```

### 5. Run the Application

```bash
mvn spring-boot:run
```

The API will start on `http://localhost:8080`

## API Endpoints

### Search Pokémon

```http
GET /api/pokemon/{name}
```

**Example Request:**
```bash
curl http://localhost:8080/api/pokemon/pikachu
```

**Success Response (200 OK):**
```json
{
  "name": "pikachu",
  "id": 25,
  "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  "height": 4,
  "weight": 60,
  "abilities": ["static", "lightning-rod"],
  "types": ["electric"]
}
```

**Error Response (404 Not Found):**
```json
{
  "timestamp": "2024-11-25T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Pokemon not found: unknown",
  "path": "/api/pokemon/unknown"
}
```

## Testing the API

### Test with Popular Pokémon

```bash
# Pikachu
curl http://localhost:8080/api/pokemon/pikachu

# Charizard
curl http://localhost:8080/api/pokemon/charizard

# Bulbasaur
curl http://localhost:8080/api/pokemon/bulbasaur

# Mewtwo
curl http://localhost:8080/api/pokemon/mewtwo
```

## Project Structure

```
src/main/java/com/pokemon/
├── PokemonSearchApplication.java    # Main application
├── config/
│   └── RedisConfig.java            # Redis & WebClient config
├── controller/
│   └── PokemonController.java      # REST endpoints
├── service/
│   ├── PokemonService.java         # Main business logic
│   ├── CacheService.java           # Redis operations
│   └── PokeApiService.java         # External API calls
├── dto/
│   ├── PokemonDTO.java             # Response model
│   └── ErrorResponse.java          # Error model
└── exception/
    ├── PokemonNotFoundException.java
    └── GlobalExceptionHandler.java # Exception handling
```
---
