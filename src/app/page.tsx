"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Home, Smile, Stethoscope, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import PetCard from "@/components/PetCard";
import api from "@/lib/api";

export default function HomePage() {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const { data } = await api.get("/pets");
        setFeaturedPets(data.slice(0, 6));
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Find Your
                <span className="text-primary"> Perfect </span>
                Companion
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Give a loving home to a pet in need. Browse our selection of adorable
                dogs, cats, birds, and rabbits waiting for their forever family.
              </p>
              <div className="flex gap-4">
                <Link href="/pets">
                  <Button variant="plastic" size="lg" className="gap-2">
                    <Heart className="h-5 w-5" />
                    Adopt Now
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="plastic" size="lg">
                    Join Us
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop"
                  alt="Happy dog"
                  className="rounded-2xl shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop"
                  alt="Cute cat"
                  className="rounded-2xl shadow-lg mt-8"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Why Adopt Section */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Adopt a Pet?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Adopting a pet not only saves a life but also brings unconditional love into your home.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: "Save a Life",
                desc: "Give a homeless pet a second chance at happiness and a loving family.",
              },
              {
                icon: Smile,
                title: "Companionship",
                desc: "Pets bring joy, reduce stress, and make wonderful companions for all ages.",
              },
              {
                icon: Shield,
                title: "Health Benefits",
                desc: "Pet owners enjoy lower blood pressure, less anxiety, and more exercise.",
              },
              {
                icon: Home,
                title: "Affordable",
                desc: "Adoption fees are much lower than buying from breeders or pet stores.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Featured Pets</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet some of our adorable pets looking for their forever homes.
            </p>
          </motion.div>

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
          ) : featuredPets.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPets.map((pet: any) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No pets available yet.</p>
              <Link href="/dashboard/add-pet">
                <Button variant="plastic">Add a Pet</Button>
              </Link>
            </div>
          )}

          {featuredPets.length > 0 && (
            <div className="text-center mt-8">
              <Link href="/pets">
                <Button variant="plastic" size="lg">
                  View All Pets
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Heartwarming tales of pets who found their forever homes through PawAdopt.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Max the Labrador",
                story:
                  "Max was rescued from the streets and found a loving family with two kids. Now he enjoys daily walks and belly rubs.",
                image:
                  "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
              },
              {
                name: "Luna the Persian Cat",
                story:
                  "After being surrendered by her previous owner, Luna was adopted by a retired couple who spoil her with treats and cozy naps.",
                image:
                  "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
              },
              {
                name: "Charlie the Beagle",
                story:
                  "Charlie waited 6 months at the shelter before a young professional adopted him. They're now inseparable hiking buddies.",
                image:
                  "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=300&fit=crop",
              },
            ].map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2">{story.name}</h3>
                  <p className="text-sm text-muted-foreground">{story.story}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pet Care Tips */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Pet Care Tips</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Essential advice to keep your new furry friend happy and healthy.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Stethoscope,
                title: "Regular Vet Visits",
                desc: "Schedule annual check-ups and keep vaccinations up to date for a healthy pet.",
              },
              {
                icon: HeartHandshake,
                title: "Proper Nutrition",
                desc: "Feed your pet a balanced diet appropriate for their age, size, and breed.",
              },
              {
                icon: Smile,
                title: "Exercise & Play",
                desc: "Daily walks and playtime keep your pet physically fit and mentally stimulated.",
              },
              {
                icon: Shield,
                title: "Grooming",
                desc: "Regular brushing, bathing, and nail trimming keep your pet clean and comfortable.",
              },
              {
                icon: Home,
                title: "Safe Environment",
                desc: "Pet-proof your home by removing hazards and providing a comfortable resting area.",
              },
              {
                icon: Heart,
                title: "Love & Attention",
                desc: "Spend quality time with your pet — they thrive on affection and companionship.",
              },
            ].map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3">
                  <tip.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
