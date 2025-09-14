"use client";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { api } from "@/api/api";
import {
  CREATE_SHOP_API,
  LIST_SHOPS_API,
} from "@/constants/apiConstants/shop";
import { useServices, Service } from "@/hooks/useServices";

type ShopForm = {
  name: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  region: string;
  postal_code: string;
  country_code: string;
  latitude: number;
  longitude: number;
  services: {
    service_id: string;
    base_price_cents: number;
    currency: string;
    estimated_minutes: number;
    notes?: string;
  }[];
};

export default function ShopsPage() {
  const [shops, setShops] = useState<any[]>([]);
  const { services: availableServices, loading } = useServices();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<ShopForm>({
    defaultValues: {
      name: "Super Auto Shop",
      address_line_1: "123 Main St",
      address_line_2: "Unit 4B",
      city: "Toronto",
      region: "ON",
      postal_code: "M5J2N8",
      country_code: "CA",
      latitude: 43.65107,
      longitude: -79.347015,
      services: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  // Fetch shops
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await api({ endpoint: LIST_SHOPS_API });
        if (res.data.ok) {
          setShops(res.data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch shops", err);
      }
    };
    fetchShops();
  }, []);

  // Create shop
  const onSubmit = async (formData: ShopForm) => {
    try {
      const res = await api({
        endpoint: CREATE_SHOP_API,
        payloadData: formData,
      });
      console.log("Shop created:", res.data);
      setShops((prev) => [...prev, res.data.data || formData]);
      reset();
    } catch (err) {
      console.error("Failed to create shop", err);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Shops</h2>

      {/* Create Shop Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Shop</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Shop Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input {...register("name", { required: true })} placeholder="Shop Name" className="border rounded-lg p-2 text-gray-900" />
            <input {...register("address_line_1", { required: true })} placeholder="Address Line 1" className="border rounded-lg p-2 text-gray-900" />
            <input {...register("address_line_2")} placeholder="Address Line 2" className="border rounded-lg p-2 text-gray-900" />
            <input {...register("city", { required: true })} placeholder="City" className="border rounded-lg p-2 text-gray-900" />
            <input {...register("region", { required: true })} placeholder="Region/State" className="border rounded-lg p-2 text-gray-900" />
            <input {...register("postal_code", { required: true })} placeholder="Postal Code" className="border rounded-lg p-2 text-gray-900" />
            <input {...register("country_code", { required: true })} placeholder="Country Code" className="border rounded-lg p-2 text-gray-900" />
            <input type="number" step="any" {...register("latitude", { required: true, valueAsNumber: true })} placeholder="Latitude" className="border rounded-lg p-2 text-gray-900" />
            <input type="number" step="any" {...register("longitude", { required: true, valueAsNumber: true })} placeholder="Longitude" className="border rounded-lg p-2 text-gray-900" />
          </div>

          {/* Services Section */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-2">Services</h4>
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-4 p-3 border rounded-lg bg-gray-50">
                {/* Select service */}
                <select
                  {...register(`services.${index}.service_id`, { required: true })}
                  className="border rounded-lg p-2 text-gray-900"
                  defaultValue={field.service_id || ""}
                >
                  <option value="">Select Service</option>
                  {availableServices.map((s: Service) => (
                    <option key={s.service_id} value={s.service_id}>
                      {s.name}
                    </option>
                  ))}
                </select>

                {/* Price */}
                <input
                  type="number"
                  {...register(`services.${index}.base_price_cents`, { required: true, valueAsNumber: true })}
                  placeholder="Price (cents)"
                  className="border rounded-lg p-2 text-gray-900"
                />

                {/* Currency */}
                <input
                  {...register(`services.${index}.currency`, { required: true })}
                  placeholder="Currency"
                  defaultValue="CAD"
                  className="border rounded-lg p-2 text-gray-900"
                />

                {/* Estimated minutes */}
                <input
                  type="number"
                  {...register(`services.${index}.estimated_minutes`, { required: true, valueAsNumber: true })}
                  placeholder="Minutes"
                  className="border rounded-lg p-2 text-gray-900"
                />

                {/* Notes */}
                <input
                  {...register(`services.${index}.notes`)}
                  placeholder="Notes"
                  className="border rounded-lg p-2 text-gray-900"
                />

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Add Service Button */}
            <button
              type="button"
              onClick={() =>
                append({
                  service_id: "",
                  base_price_cents: 0,
                  currency: "CAD",
                  estimated_minutes: 30,
                  notes: "",
                })
              }
              className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded-lg"
            >
              + Add Service
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Create Shop"}
          </button>
        </form>
      </div>

      {/* Shops Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-900 text-sm uppercase tracking-wider">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Region</th>
              <th className="px-4 py-2">Postal</th>
              <th className="px-4 py-2">Country</th>
            </tr>
          </thead>
          <tbody>
            {shops.map((s, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50 transition text-gray-900">
                <td className="px-4 py-2 font-medium">{idx + 1}</td>
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.city}</td>
                <td className="px-4 py-2">{s.region}</td>
                <td className="px-4 py-2">{s.postal_code}</td>
                <td className="px-4 py-2">{s.country_code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
