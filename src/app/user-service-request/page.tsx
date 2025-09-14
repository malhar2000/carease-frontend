"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { api } from "@/api/api";
import { CREATE_USER_SERVICE_REQUEST_WITH_ITEMS_API } from "@/constants/apiConstants/userServiceRequest";
import { useServices } from "@/hooks/useServices";
import { useVehicles } from "@/hooks/useVehicles";
import { useState } from "react";

type Request = {
  vehicle_id: string;
  status: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  region: string;
  postal_code: string;
  country_code: string;
  preferred_start: string;
  preferred_end: string;
  notes?: string;
  budget_cents: number;
  currency: string;
};

type RequestItem = {
  service_id: string;
  detail: string;
  quantity: number;
};

type UserServiceRequestForm = {
  request: Request;
  items: RequestItem[];
};

export default function UserServiceRequestPage() {
  const { services } = useServices();
  const { vehicles, loading: vehiclesLoading, error: vehiclesError } = useVehicles();
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<UserServiceRequestForm>({
    defaultValues: {
      request: {
        vehicle_id: "",
        status: "open",
        latitude: 37.7749,
        longitude: -122.4194,
        address: "123 Market St",
        city: "San Francisco",
        region: "CA",
        postal_code: "94103",
        country_code: "US",
        preferred_start: "2025-09-15T09:00",
        preferred_end: "2025-09-15T18:00",
        notes: "",
        budget_cents: 500000,
        currency: "USD",
      },
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (formData: UserServiceRequestForm) => {
    formData.request.preferred_start = new Date(formData.request.preferred_start).toISOString();
    formData.request.preferred_end = new Date(formData.request.preferred_end).toISOString();
    try {
      const res = await api({
        endpoint: CREATE_USER_SERVICE_REQUEST_WITH_ITEMS_API,
        payloadData: formData,
      });

      console.log("Request created:", res.data);
      setSuccess("Service request created successfully!");
    //   reset();
    } catch (err) {
      console.error("Failed to create request", err);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Create Service Request</h2>

      {success && <div className="p-3 bg-green-100 text-green-700 rounded">{success}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Request Info */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Request Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ✅ Vehicle Selector */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Select Vehicle
              </label>
              {vehiclesLoading && <p className="text-gray-600">Loading vehicles...</p>}
              {vehiclesError && <p className="text-red-600">{vehiclesError}</p>}
              {!vehiclesLoading && !vehiclesError && (
                <select
                  {...register("request.vehicle_id", { required: true })}
                  className="border rounded-lg p-2 w-full text-gray-900"
                >
                  <option value="">Choose a vehicle</option>
                  {vehicles.map((v) => (
                    <option key={v.vehicle_id} value={v.vehicle_id}>
                      {v.year} {v.make} {v.model} ({v.plate})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <input {...register("request.status", { required: true })} placeholder="Status" className="border rounded-lg p-2 text-gray-900" />
            <input type="number" step="any" {...register("request.latitude", { required: true, valueAsNumber: true })} placeholder="Latitude" className="border rounded-lg p-2 text-gray-900" />
            <input type="number" step="any" {...register("request.longitude", { required: true, valueAsNumber: true })} placeholder="Longitude" className="border rounded-lg p-2 text-gray-900" />
            <input {...register("request.address", { required: true })} placeholder="Address" className="border rounded-lg p-2 text-gray-900" />
            <input {...register("request.city", { required: true })} placeholder="City" className="border rounded-lg p-2 text-gray-900" />
            <input {...register("request.region", { required: true })} placeholder="Region" className="border rounded-lg p-2 text-gray-900" />
            <input {...register("request.postal_code", { required: true })} placeholder="Postal Code" className="border rounded-lg p-2 text-gray-900" />
            <input {...register("request.country_code", { required: true })} placeholder="Country Code" className="border rounded-lg p-2 text-gray-900" />
            <input type="datetime-local" {...register("request.preferred_start", { required: true })} className="border rounded-lg p-2 text-gray-900" />
            <input type="datetime-local" {...register("request.preferred_end", { required: true })} className="border rounded-lg p-2 text-gray-900" />
            <textarea {...register("request.notes")} placeholder="Notes" className="border rounded-lg p-2 text-gray-900 md:col-span-2" />
            <input type="number" {...register("request.budget_cents", { required: true, valueAsNumber: true })} placeholder="Budget (cents)" className="border rounded-lg p-2 text-gray-900" />
            <input {...register("request.currency", { required: true })} placeholder="Currency" className="border rounded-lg p-2 text-gray-900" />
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Items</h3>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-4 p-3 border rounded-lg bg-gray-50"
            >
              {/* Select service */}
              <select
                {...register(`items.${index}.service_id`, { required: true })}
                className="border rounded-lg p-2 text-gray-900"
                defaultValue={field.service_id || ""}
              >
                <option value="">Select Service</option>
                {services.map((s) => (
                  <option key={s.service_id} value={s.service_id}>
                    {s.name}
                  </option>
                ))}
              </select>

              <input {...register(`items.${index}.detail`, { required: true })} placeholder="Detail" className="border rounded-lg p-2 text-gray-900" />

              <input type="number" {...register(`items.${index}.quantity`, { required: true, valueAsNumber: true })} placeholder="Quantity" className="border rounded-lg p-2 text-gray-900" />

              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({
                service_id: "",
                detail: "",
                quantity: 1,
              })
            }
            className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded-lg"
          >
            + Add Item
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
