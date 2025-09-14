"use client";
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import { LIST_VEHICLES_API } from "@/constants/apiConstants/vehicle";

export type Vehicle = {
  vehicle_id: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  vin: string;
  plate: string;
  region: string;
  odometer_km: number;
  fuel_type: string;
  transmission: string;
  metadata?: Record<string, any>;
};

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await api({ endpoint: LIST_VEHICLES_API });
        const data = res.data;
        if (data.ok) {
          setVehicles(data.data || []);
        } else {
          setError("Failed to fetch vehicles");
        }
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("An error occurred while fetching vehicles");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return { vehicles, loading, error };
}
