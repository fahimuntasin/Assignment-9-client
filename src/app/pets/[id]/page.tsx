"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageWithFallback from "@/components/ImageWithFallback";
import {
  MapPin,
  Heart,
  Stethoscope,
  Syringe,
  Calendar,
  PawPrint,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

export default function PetDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const { data } = await api.get(`/pets/${id}`);
        setPet(data);
      } catch {
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  const handleAdopt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    if (!pickupDate) {
      toast.error("Please select a pickup date");
      return;
    }

    setFormErrors({});

    setSubmitting(true);
    try {
      await api.post("/requests", {
        petId: id,
        pickupDate,
        message,
      });
      toast.success("Adoption request submitted successfully!");
      setPickupDate("");
      setMessage("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAdoptClick = () => {
    if (!user) {
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <PawPrint className="h-10 w-10 animate-pulse text-primary" />
          <p className="text-muted-foreground">Loading pet details...</p>
        </div>
      </div>
    );
  }

  if (!pet) return null;

  const isOwner = user && pet.owner?._id === user._id;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Button variant="ghost" className="mb-6 gap-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-2xl overflow-hidden mb-6">
            <ImageWithFallback
              src={pet.image}
              alt={pet.name}
              className="w-full aspect-[16/10] object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold mb-2">{pet.name}</h1>
          <p className="text-lg text-muted-foreground mb-6">
            {pet.breed} &bull; {pet.species}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{pet.age} {pet.age === 1 ? "year" : "years"} old</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <PawPrint className="h-4 w-4 text-primary" />
              <span>{pet.gender}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{pet.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Stethoscope className="h-4 w-4 text-primary" />
              <span>{pet.healthStatus}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Syringe className="h-4 w-4 text-primary" />
              <span>{pet.vaccinationStatus}</span>
            </div>
            <Badge className="w-fit" variant={pet.adopted ? "destructive" : "default"}>
              {pet.adopted ? "Adopted" : "Available"}
            </Badge>
          </div>

          <h2 className="text-xl font-semibold mb-3">About {pet.name}</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">{pet.description}</p>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Adoption Fee</span>
                <span className="text-primary text-2xl">
                  {pet.adoptionFee === 0 ? "Free" : `$${pet.adoptionFee}`}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pet.adopted ? (
                <div className="text-center py-4">
                  <Heart className="h-12 w-12 mx-auto text-destructive mb-3" />
                  <p className="font-semibold text-lg">Already Adopted</p>
                  <p className="text-sm text-muted-foreground">
                    This pet has found a loving home.
                  </p>
                </div>
              ) : isOwner ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">This is your pet listing.</p>
                </div>
              ) : (
                <form onSubmit={handleAdopt} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Pet Name</Label>
                    <Input value={pet.name} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Your Name</Label>
                    <Input value={user?.name || ""} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Your Email</Label>
                    <Input value={user?.email || ""} readOnly />
                  </div>
                    <div className="space-y-2">
                    <Label htmlFor="pickupDate">Pickup Date *</Label>
                    <Input
                      id="pickupDate"
                      type="date"
                      value={pickupDate}
                      onChange={(e) => { setPickupDate(e.target.value); setFormErrors({}); }}
                      className={formErrors.pickupDate ? "border-destructive" : ""}
                      required
                    />
                    {formErrors.pickupDate && <p className="text-xs text-destructive">{formErrors.pickupDate}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell the owner why you'd be a great home..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="plastic"
                    className="w-full gap-2"
                    disabled={submitting}
                    onClick={handleAdoptClick}
                  >
                    <Heart className="h-4 w-4" />
                    {submitting ? "Submitting..." : "Adopt Now"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
