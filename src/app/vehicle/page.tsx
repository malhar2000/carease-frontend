"use client";
import { api } from "@/api/api";
import { LIST_VEHICLES_API, CREATE_VEHICLE_API } from "@/constants/apiConstants/vehicle";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Vehicle = {
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

export default function UserVehicles() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Vehicle>();

    // Fetch Vehicles
    useEffect(() => {
        const fetchVehicles = async () => {
            const res = await api({ endpoint: LIST_VEHICLES_API });
            const data = res.data;
            if (data.ok) {
                setVehicles(data.data || []);
            }
        };
        fetchVehicles();
    }, []);

    // Create Vehicle
    const onSubmit = async (data: Vehicle) => {
        try {
            const res = await api({
                endpoint: CREATE_VEHICLE_API,
                payloadData: data,
            });
            console.log("Vehicle created:", res.data);

            // Update UI instantly
            setVehicles((prev) => [...prev, data]);
            reset();
        } catch (err) {
            console.error("Failed to create vehicle", err);
        }
    };

    return (
        <div className="p-6 space-y-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">My Vehicles</h2>

            {/* Create Vehicle Form */}
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Vehicle</h3>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <input {...register("make", { required: true })} placeholder="Make" className="border rounded-lg p-2 text-gray-900" />
                    <input {...register("model", { required: true })} placeholder="Model" className="border rounded-lg p-2 text-gray-900" />
                    <input {...register("year", { required: true, valueAsNumber: true })} type="number" placeholder="Year" className="border rounded-lg p-2 text-gray-900" />
                    <input {...register("trim")} placeholder="Trim" className="border rounded-lg p-2 text-gray-900" />
                    <input {...register("vin", { required: true })} placeholder="VIN" className="border rounded-lg p-2 text-gray-900" />
                    <input {...register("plate", { required: true })} placeholder="Plate" className="border rounded-lg p-2 text-gray-900" />
                    <input {...register("region")} placeholder="Region" className="border rounded-lg p-2 text-gray-900" />
                    <input {...register("odometer_km", { valueAsNumber: true })} type="number" placeholder="Odometer (km)" className="border rounded-lg p-2 text-gray-900" />

                    {/* New Dropdowns */}
                    <select {...register("fuel_type", { required: true })} className="border rounded-lg p-2 text-gray-900">
                        <option value="">Select Fuel Type</option>
                        <option value="gas">Gas</option>
                        <option value="diesel">Diesel</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="ev">EV</option>
                    </select>

                    <select {...register("transmission", { required: true })} className="border rounded-lg p-2 text-gray-900">
                        <option value="">Select Transmission</option>
                        <option value="auto">Automatic</option>
                        <option value="manual">Manual</option>
                        <option value="cvt">CVT</option>
                    </select>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="col-span-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                    >
                        {isSubmitting ? "Saving..." : "Create Vehicle"}
                    </button>
                </form>

            </div>

            {/* Vehicle Table */}
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full border-collapse bg-white">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-900 text-sm uppercase tracking-wider">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Make</th>
                            <th className="px-4 py-2">Model</th>
                            <th className="px-4 py-2">Year</th>
                            <th className="px-4 py-2">Plate</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((v, idx) => (
                            <>
                                <tr key={idx} className="border-t hover:bg-gray-50 transition text-gray-900">
                                    <td className="px-4 py-2 font-medium">{idx + 1}</td>
                                    <td className="px-4 py-2">{v.make}</td>
                                    <td className="px-4 py-2">{v.model}</td>
                                    <td className="px-4 py-2">{v.year}</td>
                                    <td className="px-4 py-2">{v.plate}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                                            className="text-indigo-700 hover:text-indigo-900 text-sm font-semibold"
                                        >
                                            {expandedIndex === idx ? "Hide" : "Details"}
                                        </button>
                                    </td>
                                </tr>

                                {expandedIndex === idx && (
                                    <tr className="bg-gray-50 text-gray-800">
                                        <td colSpan={6} className="px-4 py-4">
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                                <p><span className="font-semibold text-gray-900">Trim:</span> {v.trim}</p>
                                                <p><span className="font-semibold text-gray-900">VIN:</span> {v.vin}</p>
                                                <p><span className="font-semibold text-gray-900">Region:</span> {v.region}</p>
                                                <p><span className="font-semibold text-gray-900">Odometer:</span> {v.odometer_km?.toLocaleString()} km</p>
                                                <p><span className="font-semibold text-gray-900">Fuel:</span> {v.fuel_type}</p>
                                                <p><span className="font-semibold text-gray-900">Transmission:</span> {v.transmission}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
