"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { api } from "@/api/api";
import { LIST_SHOPS_API } from "@/constants/apiConstants/shop";
import {
  LIST_SHOP_USER_SERVICE_REQUESTS_BY_SHOP_API,
  GET_SHOP_USER_SERVICE_REQUEST_BY_ID_API,
} from "@/constants/apiConstants/shopUserRequest";
import { CREATE_SHOP_QUOTATION_WITH_ITEMS_API } from "@/constants/apiConstants/shopQuotation";
import { useServices } from "@/hooks/useServices";

/** ---------- Types ---------- */

type Shop = {
  shop_id: string;
  name: string;
  city?: string;
};

type Vehicle = {
  make: string;
  model: string;
  year: number;
  trim?: string;
  transmission?: string;
  fuel_type?: string;
};

type RequestItem = {
  request_item_id?: string;
  service_id: string;
  detail: string;
  quantity: number;
};

type ShopUserServiceRequestRow = {
  shop_user_service_request_id: string;
  user_service_request: {
    request_id: string;
    status: string;
    user_name: string;
    vehicle: Vehicle;
    preferred_start?: string;
    preferred_end?: string;
    city?: string;
    budget_cents?: number;
    currency?: string;
    items?: RequestItem[] | null;
  };
};

type ShopUserServiceRequestDetail = {
  shop_user_service_request_id: string;
  user_service_request: {
    request_id: string;
    status: string;
    user_name: string;
    vehicle: Vehicle;
    preferred_start: string;
    preferred_end: string;
    city: string;
    budget_cents: number;
    currency: string;
    items: RequestItem[];
  };
};

type QuotationItem = {
  request_item_id?: string;
  service_id: string;
  description: string;
  quantity: number;
  unit_price_cents: number;
  revised: boolean;
};

type QuotationPayload = {
  quotation: {
    request_id: string;
    shop_id: string;
    shop_user_service_request_id: string;
    status: "sent" | "draft" | "accepted" | "revised";
    subtotal_cents: number;
    tax_cents: number;
    total_cents: number;
    currency: string;
    valid_until: string; // ISO
    estimated_minutes: number;
    message_to_customer?: string;
    tags?: string;
    created_by: string;
    revised: boolean;
  };
  items: QuotationItem[];
};

/** ---------- Helpers ---------- */
const TAX_RATE = 0.05;

function toISOFromLocalInput(value: string) {
  return new Date(value).toISOString();
}

/** ---------- Component ---------- */
export default function ShopQuotationsPage() {
  const { services } = useServices();

  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<string>("");

  const [shopRequests, setShopRequests] = useState<ShopUserServiceRequestRow[]>([]);
  const [selectedRequestDetail, setSelectedRequestDetail] =
    useState<ShopUserServiceRequestDetail | null>(null);

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    resetField,
    formState: { isSubmitting },
  } = useForm<QuotationPayload>({
    defaultValues: {
      quotation: {
        request_id: "",
        shop_id: "",
        shop_user_service_request_id: "",
        status: "sent",
        subtotal_cents: 0,
        tax_cents: 0,
        total_cents: 0,
        currency: "USD",
        valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // +7 days
          .toISOString()
          .slice(0, 16),
        estimated_minutes: 60,
        message_to_customer: "",
        tags: "",
        revised: false,
      },
      items: [],
    },
  });

  const { fields, replace, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchValidUntilLocal = watch("quotation.valid_until");
  const items = watch("items");

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (sum, it) => sum + (it.unit_price_cents || 0) * (it.quantity || 0),
      0
    );
    const tax = Math.round(subtotal * TAX_RATE);
    return { subtotal, tax, total: subtotal + tax };
  }, [items]);

  /** ----- Fetch shops ----- */
  useEffect(() => {
    (async () => {
      try {
        const res = await api({ endpoint: LIST_SHOPS_API });
        if (res?.data?.ok) setShops(res.data.data || []);
      } catch {
        setError("Failed to load shops.");
      }
    })();
  }, []);

  /** ----- Fetch requests by shop ----- */
  useEffect(() => {
    if (!selectedShopId) return;
    (async () => {
      try {
        const res = await api({
          endpoint: LIST_SHOP_USER_SERVICE_REQUESTS_BY_SHOP_API(selectedShopId),
        });
        if (res?.data?.data) {
          setShopRequests(res.data.data);
        }
      } catch {
        setError("Failed to load requests.");
      }
    })();
  }, [selectedShopId]);

  /** ----- Fetch request detail by shop_user_service_request_id ----- */
  const handleSelectRequest = async (shopUsrReqId: string) => {
    if (!shopUsrReqId) {
      setSelectedRequestDetail(null);
      resetField("items");
      return;
    }
    try {
      const res = await api({
        endpoint: GET_SHOP_USER_SERVICE_REQUEST_BY_ID_API(shopUsrReqId),
      });
      if (res?.data?.data) {
        const detail = res.data.data as ShopUserServiceRequestDetail;
        setSelectedRequestDetail(detail);

        const usrReq = detail.user_service_request;
        setValue("quotation.request_id", usrReq.request_id);
        setValue("quotation.shop_id", selectedShopId);
        setValue("quotation.shop_user_service_request_id", shopUsrReqId);
        if (usrReq.currency) setValue("quotation.currency", usrReq.currency);

        if (usrReq.items?.length) {
          replace(
            usrReq.items.map((it) => ({
              request_item_id: it.request_item_id,
              service_id: it.service_id,
              description: it.detail,
              quantity: it.quantity,
              unit_price_cents: 0,
              revised: false,
            }))
          );
        } else {
          replace([]);
        }
      }
    } catch {
      setError("Failed to load request detail.");
    }
  };

  /** ----- Submit quotation ----- */
  const onSubmit = async (data: QuotationPayload) => {
    setSuccess(null);
    setError(null);

    if (!data.quotation.shop_user_service_request_id) {
      setError("Please select a request.");
      return;
    }
    if (data.items.length === 0) {
      setError("Add at least one item.");
      return;
    }

    const payload: QuotationPayload = {
      ...data,
      quotation: {
        ...data.quotation,
        subtotal_cents: totals.subtotal,
        tax_cents: totals.tax,
        total_cents: totals.total,
        valid_until: toISOFromLocalInput(data.quotation.valid_until),
      },
    };

    try {
      const res = await api({
        endpoint: CREATE_SHOP_QUOTATION_WITH_ITEMS_API,
        payloadData: payload,
      });
      console.log("Quotation created:", res.data);
      setSuccess("Quotation sent successfully!");
    } catch {
      setError("Failed to send quotation.");
    }
  };

  /** ---------- UI ---------- */
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Shop Quotations</h1>

      {success && <div className="p-3 bg-green-100 text-green-700 rounded">{success}</div>}
      {error && <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      {/* Shop Selector */}
      <section>
        <label className="block font-medium text-gray-800">Select Shop</label>
        <select
          value={selectedShopId}
          onChange={(e) => setSelectedShopId(e.target.value)}
          className="border rounded-lg p-2 w-full text-gray-900"
        >
          <option value="">Choose a shop</option>
          {shops.map((s) => (
            <option key={s.shop_id} value={s.shop_id}>
              {s.name} {s.city ? `(${s.city})` : ""}
            </option>
          ))}
        </select>
      </section>

      {/* Request Selector */}
      {selectedShopId && (
        <section>
          <label className="block font-medium text-gray-800">Select Request</label>
          <select
            onChange={(e) => handleSelectRequest(e.target.value)}
            className="border rounded-lg p-2 w-full text-gray-900"
          >
            <option value="">Choose a request</option>
            {shopRequests.map((r) => (
              <option
                key={r.shop_user_service_request_id}
                value={r.shop_user_service_request_id}
              >
                {r.user_service_request.city} — {r.user_service_request.status} — Budget:{" "}
                {(r.user_service_request.budget_cents ?? 0) / 100}{" "}
                {r.user_service_request.currency ?? ""}
              </option>
            ))}
          </select>
        </section>
      )}

      {/* Request Detail */}
      {selectedRequestDetail && (
        <section className="bg-white rounded-lg shadow p-5 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Responding To</h2>
          <p>
            <span className="font-semibold">User:</span>{" "}
            {selectedRequestDetail.user_service_request.user_name}
          </p>
          <p>
            <span className="font-semibold">Vehicle:</span>{" "}
            {selectedRequestDetail.user_service_request.vehicle.year}{" "}
            {selectedRequestDetail.user_service_request.vehicle.make}{" "}
            {selectedRequestDetail.user_service_request.vehicle.model}
          </p>
          <p>
            <span className="font-semibold">Budget:</span>{" "}
            {(selectedRequestDetail.user_service_request.budget_cents ?? 0) / 100}{" "}
            {selectedRequestDetail.user_service_request.currency}
          </p>
          <h3 className="font-semibold text-sm mt-2">Requested Services</h3>
          {selectedRequestDetail.user_service_request.items?.length ? (
            <ul className="list-disc list-inside text-sm">
              {selectedRequestDetail.user_service_request.items.map((it) => (
                <li key={it.request_item_id}>
                  {it.detail} · Qty {it.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items provided</p>
          )}
        </section>
      )}

      {/* Quotation Form */}
      {selectedRequestDetail && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-6 rounded-lg shadow"
        >
          <textarea
            {...register("quotation.message_to_customer")}
            placeholder="Message to customer"
            className="border rounded-lg p-2 w-full text-gray-900"
          />

          {/* Items */}
          <div className="space-y-4">
            <h3 className="font-semibold">Items</h3>
            {fields.map((field, idx) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-6 gap-4 p-3 border rounded-lg bg-gray-50"
              >
                <select
                  {...register(`items.${idx}.service_id`, { required: true })}
                  className="border rounded-lg p-2 text-gray-900"
                >
                  <option value="">Select Service</option>
                  {services.map((s) => (
                    <option key={s.service_id} value={s.service_id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <input
                  {...register(`items.${idx}.description`, { required: true })}
                  placeholder="Description"
                  className="border rounded-lg p-2 text-gray-900"
                />
                <input
                  type="number"
                  {...register(`items.${idx}.quantity`, {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="border rounded-lg p-2 text-gray-900"
                />
                <input
                  type="number"
                  {...register(`items.${idx}.unit_price_cents`, {
                    required: true,
                    valueAsNumber: true,
                  })}
                  placeholder="Price (¢)"
                  className="border rounded-lg p-2 text-gray-900"
                />
                <span className="text-xs">
                  {field.request_item_id ? "From user request" : "Shop-added"}
                </span>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="text-red-600 hover:text-red-800"
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
                  description: "",
                  quantity: 1,
                  unit_price_cents: 0,
                  revised: false,
                })
              }
              className="bg-gray-200 px-3 py-1 rounded-lg text-sm"
            >
              + Add Item
            </button>
          </div>

          {/* Totals */}
          <div className="bg-gray-100 p-4 rounded-lg text-sm">
            <p>Subtotal: {(totals.subtotal / 100).toFixed(2)}</p>
            <p>Tax: {(totals.tax / 100).toFixed(2)}</p>
            <p>Total: {(totals.total / 100).toFixed(2)}</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg"
          >
            {isSubmitting ? "Sending…" : "Send Quotation"}
          </button>
        </form>
      )}
    </div>
  );
}
