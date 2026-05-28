"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, PawPrint, AlertCircle } from "lucide-react";
import PetCard from "@/components/PetCard";
import { PetCardSkeleton } from "@/components/Skeletons";
import api from "@/lib/api";

export default function AllPetsPage() {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [error, setError] = useState("");

  const fetchPets = async () => {
    setLoading(true);
    setError("");
    try {
      const params: any = {};
      if (search.trim()) params.search = search.trim();
      if (species !== "all") params.species = species;

      const { data } = await api.get("/pets", { params });
      let sorted = [...data];
      if (sortBy === "age_asc") sorted.sort((a: any, b: any) => a.age - b.age);
      if (sortBy === "age_desc") sorted.sort((a: any, b: any) => b.age - a.age);
      if (sortBy === "name") sorted.sort((a: any, b: any) => a.name.localeCompare(b.name));
      if (sortBy === "fee_low") sorted.sort((a: any, b: any) => (a.adoptionFee || 0) - (b.adoptionFee || 0));
      setPets(sorted);
    } catch {
      setError("Failed to load pets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [species, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    fetchPets();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">All Pets</h1>
        <p className="text-muted-foreground">
          Browse our available pets and find your perfect companion.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by pet name..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button type="submit" variant="plastic" disabled={!search.trim()}>Search</Button>
        </form>

        <div className="flex gap-3">
          <Select value={species} onValueChange={(v) => setSpecies(v || "all")}>
            <SelectTrigger className="w-full sm:w-40">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Species" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Species</SelectItem>
              <SelectItem value="Dog">Dog</SelectItem>
              <SelectItem value="Cat">Cat</SelectItem>
              <SelectItem value="Bird">Bird</SelectItem>
              <SelectItem value="Rabbit">Rabbit</SelectItem>
              <SelectItem value="Fish">Fish</SelectItem>
              <SelectItem value="Hamster">Hamster</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(v) => setSortBy(v || "newest")}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="age_asc">Youngest</SelectItem>
              <SelectItem value="age_desc">Oldest</SelectItem>
              <SelectItem value="fee_low">Lowest Fee</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search hint */}
      {search.trim() && !loading && (
        <p className="text-sm text-muted-foreground mb-4">
          Showing results for &quot;{search.trim()}&quot;
          {species !== "all" && ` in ${species}`}
          <button
            onClick={() => { setSearch(""); setSpecies("all"); fetchPets(); }}
            className="ml-2 text-primary hover:underline text-xs"
          >
            Clear filters
          </button>
        </p>
      )}

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <PetCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <AlertCircle className="h-12 w-12 mx-auto text-destructive/50 mb-4" />
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button variant="plastic" onClick={fetchPets}>Try Again</Button>
        </div>
      ) : pets.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet: any) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="relative inline-block mb-6">
            <PawPrint className="h-16 w-16 text-muted-foreground/20" />
            <Search className="absolute -bottom-1 -right-1 h-6 w-6 text-muted-foreground/30" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No pets found</h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
            {search.trim() || species !== "all"
              ? "No pets match your search criteria. Try different keywords or filters."
              : "There are no pets listed yet. Check back soon!"}
          </p>
          {(search.trim() || species !== "all") && (
            <Button
              variant="plastic"
              onClick={() => { setSearch(""); setSpecies("all"); setSortBy("newest"); }}
            >
              Reset Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
