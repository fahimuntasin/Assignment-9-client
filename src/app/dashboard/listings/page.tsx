"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pencil,
  Trash2,
  Eye,
  Users,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

export default function MyListingsPage() {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editPet, setEditPet] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deletePet, setDeletePet] = useState<any>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [requestsOpen, setRequestsOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [petRequests, setPetRequests] = useState<any[]>([]);
  const [editForm, setEditForm] = useState<any>({});

  const fetchPets = async () => {
    try {
      const { data } = await api.get("/pets/my-listings");
      setPets(data);
    } catch {
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const totalListings = pets.length;
  const availablePets = pets.filter((p) => !p.adopted).length;
  const adoptedPets = pets.filter((p) => p.adopted).length;

  const handleEditClick = (pet: any) => {
    setEditPet(pet);
    setEditForm({ ...pet });
    setEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/pets/${editPet._id}`, {
        ...editForm,
        age: Number(editForm.age),
        adoptionFee: Number(editForm.adoptionFee) || 0,
      });
      toast.success("Pet updated successfully");
      setEditOpen(false);
      fetchPets();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update pet");
    }
  };

  const handleDelete = async () => {
    if (!deletePet) return;
    try {
      await api.delete(`/pets/${deletePet._id}`);
      toast.success("Pet deleted");
      setDeleteOpen(false);
      setDeletePet(null);
      fetchPets();
    } catch (err: any) {
      toast.error("Failed to delete pet");
    }
  };

  const handleViewRequests = async (pet: any) => {
    setSelectedPet(pet);
    try {
      const { data } = await api.get(`/requests/pet/${pet._id}`);
      setPetRequests(data);
    } catch {
      toast.error("Failed to load requests");
    }
    setRequestsOpen(true);
  };

  const handleApprove = async (requestId: string) => {
    try {
      await api.put(`/requests/${requestId}/approve`);
      toast.success("Request approved");
      const { data } = await api.get(`/requests/pet/${selectedPet._id}`);
      setPetRequests(data);
      fetchPets();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to approve");
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await api.put(`/requests/${requestId}/reject`);
      toast.success("Request rejected");
      const { data } = await api.get(`/requests/pet/${selectedPet._id}`);
      setPetRequests(data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to reject");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">My Listings</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Listings
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4">
            <p className="text-2xl font-bold">{totalListings}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Available
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4">
            <p className="text-2xl font-bold text-green-600">{availablePets}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Adopted
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4">
            <p className="text-2xl font-bold text-blue-600">{adoptedPets}</p>
          </CardContent>
        </Card>
      </div>

      {pets.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p>No pet listings yet.</p>
          <Link href="/dashboard/add-pet">
            <Button className="mt-4">Add Your First Pet</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {pets.map((pet) => (
            <Card key={pet._id}>
              <CardContent className="flex flex-col sm:flex-row items-start gap-4 p-4">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full sm:w-32 h-24 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{pet.name}</h3>
                    <Badge variant={pet.adopted ? "destructive" : "default"}>
                      {pet.adopted ? "Adopted" : "Available"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {pet.species} &bull; {pet.breed}
                  </p>
                  <p className="text-sm font-medium text-primary mt-1">
                    {pet.adoptionFee === 0 ? "Free" : `$${pet.adoptionFee}`}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    {pet.location}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap self-end sm:self-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewRequests(pet)}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    Requests
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(pet)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Link href={`/pets/${pet._id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDeletePet(pet);
                      setDeleteOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Pet</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Pet Name</Label>
                <Input
                  value={editForm.name || ""}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Species</Label>
                <Select
                  value={editForm.species || ""}
                  onValueChange={(v) => setEditForm({ ...editForm, species: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
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
              <div className="space-y-1.5">
                <Label>Breed</Label>
                <Input
                  value={editForm.breed || ""}
                  onChange={(e) => setEditForm({ ...editForm, breed: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Age</Label>
                <Input
                  type="number"
                  value={editForm.age || ""}
                  onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Gender</Label>
                <Select
                  value={editForm.gender || ""}
                  onValueChange={(v) => setEditForm({ ...editForm, gender: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Image URL</Label>
                <Input
                  value={editForm.image || ""}
                  onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Health Status</Label>
                <Select
                  value={editForm.healthStatus || ""}
                  onValueChange={(v) => setEditForm({ ...editForm, healthStatus: v })}
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
              <div className="space-y-1.5">
                <Label>Vaccination</Label>
                <Select
                  value={editForm.vaccinationStatus || ""}
                  onValueChange={(v) => setEditForm({ ...editForm, vaccinationStatus: v })}
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
              <div className="space-y-1.5">
                <Label>Location</Label>
                <Input
                  value={editForm.location || ""}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Adoption Fee</Label>
                <Input
                  type="number"
                  value={editForm.adoptionFee || ""}
                  onChange={(e) => setEditForm({ ...editForm, adoptionFee: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={editForm.description || ""}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete Pet
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {deletePet?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Requests Modal */}
      <Dialog open={requestsOpen} onOpenChange={setRequestsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Adoption Requests for {selectedPet?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {petRequests.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No adoption requests yet.
              </p>
            ) : (
              petRequests.map((req) => (
                <div key={req._id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{req.userName}</p>
                      <p className="text-sm text-muted-foreground">{req.userEmail}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Pickup: {new Date(req.pickupDate).toLocaleDateString()}
                      </p>
                      {req.message && (
                        <p className="text-sm mt-2 bg-muted p-2 rounded">
                          {req.message}
                        </p>
                      )}
                    </div>
                    <Badge variant={req.status === "approved" ? "secondary" : req.status === "rejected" ? "destructive" : "default"} className="capitalize">
                      {req.status}
                    </Badge>
                  </div>
                  {req.status === "pending" && (
                    <div className="flex gap-2 pt-2 border-t">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(req._id)}
                        className="flex-1"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(req._id)}
                        className="flex-1"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
