import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const TYPE_COLORS = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-400",
  fighting: "bg-red-600",
  poison: "bg-purple-500",
  ground: "bg-yellow-700",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-800",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-600",
  dark: "bg-gray-700",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchPokemon = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Please enter a Pokémon name",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError("");
    setPokemon(null);

    try {
      const response = await fetch(
        `http://localhost:8080/api/pokemon/${searchTerm.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("Pokémon not found");
      }

      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError(err.message || "Failed to fetch Pokémon");
      toast({
        title: "Error",
        description: err.message || "Failed to fetch Pokémon",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchPokemon();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">
            PokéSearch
          </h1>
          <p className="text-muted-foreground text-lg">
            Search and discover your favorite Pokémon
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-8 animate-fade-in">
          <Card className="shadow-search border-2 border-primary/20 bg-gradient-card">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Enter Pokémon name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 text-lg h-12 border-border/50 focus-visible:ring-primary"
                  disabled={loading}
                />
                <Button
                  onClick={searchPokemon}
                  disabled={loading}
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 transition-opacity px-8"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
            </div>
            <p className="mt-4 text-muted-foreground">Searching for Pokémon...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card className="bg-destructive/10 border-destructive/20 animate-fade-in">
            <CardContent className="p-6 text-center">
              <p className="text-destructive font-medium">{error}</p>
              <p className="text-muted-foreground text-sm mt-2">
                Try searching for another Pokémon
              </p>
            </CardContent>
          </Card>
        )}

        {/* Pokemon Details */}
        {pokemon && !loading && (
          <Card className="shadow-card border-2 border-border bg-gradient-card animate-fade-in">
            <CardContent className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Image */}
                <div className="flex flex-col items-center">
                  <div className="relative w-full max-w-sm aspect-square bg-muted/30 rounded-2xl p-8 flex items-center justify-center mb-4">
                    <img
                      src={pokemon.image}
                      alt={pokemon.name}
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>
                  <h2 className="text-4xl font-bold capitalize text-center">
                    {pokemon.name}
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    #{String(pokemon.id).padStart(3, "0")}
                  </p>
                </div>

                {/* Right Column - Details */}
                <div className="space-y-6">
                  {/* Types */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Types
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {pokemon.types?.map((type) => (
                        <Badge
                          key={type}
                          className={`${
                            TYPE_COLORS[type.toLowerCase()] || "bg-gray-400"
                          } text-white capitalize px-4 py-1.5 text-sm font-medium`}
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Physical Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Height</p>
                      <p className="text-2xl font-bold">{pokemon.height / 10}m</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Weight</p>
                      <p className="text-2xl font-bold">{pokemon.weight / 10}kg</p>
                    </div>
                  </div>

                  {/* Abilities */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Abilities
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {pokemon.abilities?.map((ability) => (
                        <Badge
                          key={ability}
                          variant="secondary"
                          className="capitalize px-4 py-1.5 text-sm"
                        >
                          {ability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!pokemon && !loading && !error && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-muted-foreground text-lg">
              Search for a Pokémon to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
