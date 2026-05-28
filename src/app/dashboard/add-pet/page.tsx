"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import api from "@/lib/api";

export default function AddPetPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    image: "",
    healthStatus: "Healthy",
    vaccinationStatus: "Vaccinated",
    location: "",
    adoptionFee: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string | null) => {
    setFormData({ ...formData, [name]: value || "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.species || !formData.breed || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await api.post("/pets", {
        ...formData,
        age: Number(formData.age),
        adoptionFee: Number(formData.adoptionFee) || 0,
      });
      toast.success("Pet added successfully!");
      router.push("/dashboard/listings");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add pet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Pet</h1>
      <Card>
        <CardHeader>
          <CardTitle>Pet Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Pet Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Buddy"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Species *</Label>
                <Select
                  value={formData.species}
                  onValueChange={(v) => handleSelectChange("species", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select species" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dog">Dog</SelectItem>
                    <SelectItem value="Cat">Cat</SelectItem>
                    <SelectItem value="Bird">Bird</SelectItem>
                    <SelectItem value="Rabbit">Rabbit</SelectItem>
                    <SelectItem value="Fish">Fish</SelectItem>
                    <SelectItem value="Hamster">Hamster</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="breed">Breed *</Label>
                <Input
                  id="breed"
                  name="breed"
                  placeholder="e.g. Golden Retriever"
                  value={formData.breed}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age (years) *</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="0"
                  placeholder="e.g. 2"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Gender *</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(v) => handleSelectChange("gender", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL *</Label>
                <Input
                  id="image"
                  name="image"
                  placeholder="https://imgbb.com/your-image.jpg"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Health Status</Label>
                <Select
                  value={formData.healthStatus}
                  onValueChange={(v) => handleSelectChange("healthStatus", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Healthy">Healthy</SelectItem>
                    <SelectItem value="Needs Care">Needs Care</SelectItem>
                    <SelectItem value="Under Treatment">Under Treatment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Vaccination Status</Label>
                <Select
                  value={formData.vaccinationStatus}
                  onValueChange={(v) => handleSelectChange("vaccinationStatus", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vaccinated">Vaccinated</SelectItem>
                    <SelectItem value="Partially Vaccinated">Partially Vaccinated</SelectItem>
                    <SelectItem value="Not Vaccinated">Not Vaccinated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. New York, NY"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adoptionFee">Adoption Fee ($)</Label>
                <Input
                  id="adoptionFee"
                  name="adoptionFee"
                  type="number"
                  min="0"
                  placeholder="e.g. 50"
                  value={formData.adoptionFee}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerEmail">Owner Email</Label>
              <Input id="ownerEmail" value={user?.email || ""} readOnly />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the pet's personality, habits, and any special needs..."
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full sm:w-auto" disabled={loading} variant="plastic">
              {loading ? "Adding Pet..." : "Add Pet"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
