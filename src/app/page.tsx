"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Home, Smile, Stethoscope, HeartHandshake, Cat, Dog, Bird, Rabbit } from "lucide-react";
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
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-background to-emerald-500/5">
        {/* Floating pet icons */}
        <motion.div
          className="absolute top-[15%] left-[5%] text-emerald-500/15"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Dog size={40} />
        </motion.div>
        <motion.div
          className="absolute top-[60%] right-[8%] text-emerald-500/15"
          animate={{ y: [0, -12, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        >
          <Cat size={36} />
        </motion.div>
        <motion.div
          className="absolute top-[30%] right-[15%] text-emerald-500/10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <Bird size={28} />
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] left-[10%] text-emerald-500/10"
          animate={{ y: [0, -18, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 0.3 }}
        >
          <Rabbit size={32} />
        </motion.div>

        {/* Floating paw prints */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-emerald-500/5"
            style={{ top: `${10 + i * 10}%`, left: `${i % 2 === 0 ? 2 : 95}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.03, 0.08, 0.03] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="8" cy="6" r="2.5" />
              <circle cx="16" cy="6" r="2.5" />
              <circle cx="4" cy="13" r="2.5" />
              <circle cx="20" cy="13" r="2.5" />
              <ellipse cx="12" cy="20" rx="6" ry="4" />
            </svg>
          </motion.div>
        ))}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Find Your
                <span className="text-emerald-500"> Perfect </span>
                Companion
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Give a loving home to a pet in need. Browse our selection of adorable
                dogs, cats, birds, and rabbits waiting for their forever family.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/pets">
                  <Button variant="plastic" size="lg" className="gap-2 group">
                    <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    Adopt Now
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="plastic" size="lg">
                    Join Us
                  </Button>
                </Link>
              </div>

              {/* Quick stat badges */}
              <div className="flex gap-6 mt-10">
                {[
                  { icon: Dog, label: "Dogs", count: "45+" },
                  { icon: Cat, label: "Cats", count: "30+" },
                  { icon: Bird, label: "Birds", count: "15+" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-500/10">
                      <item.icon className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.count}</p>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute -top-2 -left-2 w-full h-full bg-emerald-500/10 rounded-2xl" />
                  <img
                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop"
                    alt="Happy dog"
                    className="relative rounded-2xl shadow-lg object-cover w-full h-64"
                  />
                </div>
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute -bottom-2 -right-2 w-full h-full bg-emerald-500/10 rounded-2xl" />
                    <img
                      src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop"
                      alt="Cute cat"
                      className="relative rounded-2xl shadow-lg object-cover w-full h-64"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
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
                hoverColor: "rose",
              },
              {
                icon: Smile,
                title: "Companionship",
                desc: "Pets bring joy, reduce stress, and make wonderful companions for all ages.",
                hoverColor: "amber",
              },
              {
                icon: Shield,
                title: "Health Benefits",
                desc: "Pet owners enjoy lower blood pressure, less anxiety, and more exercise.",
                hoverColor: "blue",
              },
              {
                icon: Home,
                title: "Affordable",
                desc: "Adoption fees are much lower than buying from breeders or pet stores.",
                hoverColor: "emerald",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <item.icon className="h-7 w-7 text-emerald-500 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
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
                icon: Dog,
              },
              {
                name: "Luna the Persian Cat",
                story:
                  "After being surrendered by her previous owner, Luna was adopted by a retired couple who spoil her with treats and cozy naps.",
                image:
                  "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
                icon: Cat,
              },
              {
                name: "Charlie the Beagle",
                story:
                  "Charlie waited 6 months at the shelter before a young professional adopted him. They're now inseparable hiking buddies.",
                image:
                  "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=300&fit=crop",
                icon: Dog,
              },
            ].map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm">
                    <story.icon className="h-4 w-4 text-emerald-500" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2">{story.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{story.story}</p>
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
                className="group bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <tip.icon className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="font-semibold mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500/10 via-background to-emerald-500/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 mb-6">
              <Heart className="h-8 w-8 text-emerald-500 fill-emerald-500/20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Welcome a New Friend?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every pet deserves a loving home. Start your adoption journey today and make a difference in a pet&apos;s life.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/pets">
                <Button variant="plastic" size="lg" className="gap-2">
                  <Dog className="h-5 w-5" />
                  Browse Pets
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="plastic" size="lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
