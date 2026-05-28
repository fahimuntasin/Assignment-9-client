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
import { Search, SlidersHorizontal } from "lucide-react";
import PetCard from "@/components/PetCard";
import api from "@/lib/api";

export default function AllPetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("all");

  const fetchPets = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (search) params.search = search;
      if (species !== "all") params.species = species;

      const { data } = await api.get("/pets", { params });
      setPets(data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [species]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
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
          <Button type="submit" variant="plastic">Search</Button>
        </form>

        <Select value={species} onValueChange={(v) => setSpecies(v || "all")}>
          <SelectTrigger className="w-full sm:w-44">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter species" />
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
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl border bg-card animate-pulse">
              <div className="aspect-[4/3] bg-muted rounded-t-xl" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-muted rounded w-2/3" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : pets.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet: any) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">No pets found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
