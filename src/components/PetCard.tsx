"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Heart, Eye } from "lucide-react";
import { motion } from "framer-motion";

type Pet = {
  _id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  image: string;
  location: string;
  adoptionFee: number;
  adopted: boolean;
};

export default function PetCard({ pet }: { pet: Pet }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <Badge
            className={`absolute top-3 right-3 ${
              pet.adopted ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {pet.adopted ? "Adopted" : "Available"}
          </Badge>
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg">{pet.name}</h3>
              <p className="text-sm text-muted-foreground">
                {pet.breed} &bull; {pet.age} {pet.age === 1 ? "year" : "years"} old
              </p>
            </div>
            <Badge variant="outline">{pet.gender}</Badge>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>{pet.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground capitalize">{pet.species}</span>
            <span className="font-semibold text-primary">
              {pet.adoptionFee === 0 ? "Free" : `$${pet.adoptionFee}`}
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Link href={`/pets/${pet._id}`} className="w-full">
            <Button variant="outline" className="w-full gap-2">
              <Eye className="h-4 w-4" />
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
