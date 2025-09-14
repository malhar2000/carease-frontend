"use client";
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import { LIST_SERVICES_API } from "@/constants/apiConstants/service";

export type Service = {
  service_id: string;
  name: string;
  description: string;
  category: string;
};

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await api({ endpoint: LIST_SERVICES_API });
        const data = res.data;

        if (data.ok) {
          setServices(data.data || []);
        } else {
          setError("Failed to load services");
        }
      } catch (err: any) {
        console.error("Error fetching services:", err);
        setError("An error occurred while fetching services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
}
