"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, X, Calendar } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const { data } = await api.get("/requests/my");
      setRequests(data);
    } catch {
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleCancel = async (id: string) => {
    try {
      await api.put(`/requests/${id}/cancel`);
      toast.success("Request cancelled");
      fetchRequests();
    } catch {
      toast.error("Failed to cancel request");
    }
  };

  const statusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "default",
      approved: "secondary",
      rejected: "destructive",
      cancelled: "outline",
    };
    return variants[status] || "default";
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
      <h1 className="text-2xl font-bold mb-6">My Requests</h1>

      {requests.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p>No adoption requests yet.</p>
          <Link href="/pets">
            <Button variant="outline" className="mt-4">
              Browse Pets
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <Card key={req._id}>
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-4">
                <div className="flex items-center gap-4">
                  {req.pet?.image && (
                    <img
                      src={req.pet.image}
                      alt={req.petName}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{req.petName}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Pickup: {new Date(req.pickupDate).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Requested: {new Date(req.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={statusBadge(req.status)} className="capitalize">
                    {req.status}
                  </Badge>
                  <Link href={`/pets/${req.pet?._id}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  {req.status === "pending" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCancel(req._id)}
                    >
                      <X className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
