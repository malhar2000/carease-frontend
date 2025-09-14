"use client";
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import {
  LIST_USER_SERVICE_REQUESTS_BY_USER_API,
  GET_USER_SERVICE_REQUEST_BY_ID_API,
} from "@/constants/apiConstants/userServiceRequest";
import { LIST_SHOP_QUOTATIONS_BY_REQUEST_API, GET_QUOTATION_FOR_USER_BY_ID_API } from "@/constants/apiConstants/shopQuotation";

type Request = {
  request_id: string;
  budget_cents: number;
  city: string;
  preferred_start: string;
  preferred_end: string;
  status: string;
  user_id: string;
};

type Quotation = {
  quotation_id: string;
  shop_name: string;
  status: string;
  subtotal_cents: number;
  tax_cents: number;
  total_cents: number;
  currency: string;
  valid_until: string;
  estimated_minutes: number;
  message_to_customer?: string;
  tags?: string;
};

type QuotationDetail = Quotation & {
  items: {
    service_id: string;
    service_name: string;
    description: string;
    quantity: number;
    unit_price_cents: number;
    labor_cost_cents: number;
    parts_cost_cents: number;
    line_total_cents: number;
  }[];
};

export default function UserServiceRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loadingQuotations, setLoadingQuotations] = useState(false);

  const [selectedQuotation, setSelectedQuotation] = useState<QuotationDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await api({ endpoint: LIST_USER_SERVICE_REQUESTS_BY_USER_API });
        const data = res.data;
        if (data.ok) {
          setRequests(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch service requests", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const fetchQuotations = async (requestId: string) => {
    setLoadingQuotations(true);
    try {
      const res = await api({ endpoint: LIST_SHOP_QUOTATIONS_BY_REQUEST_API(requestId) });
      if (res.data?.ok) {
        setQuotations(res.data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch quotations", err);
    } finally {
      setLoadingQuotations(false);
    }
  };

  const fetchQuotationDetail = async (quotationId: string) => {
    setLoadingDetail(true);
    try {
      const res = await api({ endpoint: GET_QUOTATION_FOR_USER_BY_ID_API(quotationId) });
      if (res.data?.ok) {
        setSelectedQuotation(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch quotation detail", err);
    } finally {
      setLoadingDetail(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">My Service Requests</h2>

      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-900 text-sm uppercase tracking-wider">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">Budget</th>
                <th className="px-4 py-2">Preferred Start</th>
                <th className="px-4 py-2">Preferred End</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, idx) => (
                <>
                  <tr
                    key={req.request_id}
                    className="border-t hover:bg-gray-50 transition text-gray-900"
                  >
                    <td className="px-4 py-2 font-medium">{idx + 1}</td>
                    <td className="px-4 py-2 capitalize">{req.status}</td>
                    <td className="px-4 py-2">{req.city}</td>
                    <td className="px-4 py-2">
                      {(req.budget_cents / 100).toLocaleString()} USD
                    </td>
                    <td className="px-4 py-2">
                      {new Date(req.preferred_start).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(req.preferred_end).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 space-x-3">
                      <button
                        onClick={() => {
                          const next = expandedIndex === idx ? null : idx;
                          setExpandedIndex(next);
                          if (next !== null) fetchQuotations(req.request_id);
                        }}
                        className="text-indigo-700 hover:text-indigo-900 text-sm font-semibold"
                      >
                        {expandedIndex === idx ? "Hide" : "Details"}
                      </button>
                    </td>
                  </tr>

                  {expandedIndex === idx && (
                    <tr className="bg-gray-50 text-gray-800">
                      <td colSpan={7} className="px-4 py-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Quotations
                        </h4>
                        {loadingQuotations ? (
                          <p>Loading quotations...</p>
                        ) : quotations.length === 0 ? (
                          <p>No quotations found for this request.</p>
                        ) : (
                          <table className="min-w-full border-collapse bg-white border">
                            <thead>
                              <tr className="bg-gray-100 text-left text-gray-900 text-sm uppercase tracking-wider">
                                <th className="px-4 py-2">Shop</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Total</th>
                                <th className="px-4 py-2">Valid Until</th>
                                <th className="px-4 py-2">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {quotations.map((q) => (
                                <tr key={q.quotation_id} className="border-t">
                                  <td className="px-4 py-2">{q.shop_name}</td>
                                  <td className="px-4 py-2 capitalize">
                                    {q.status}
                                  </td>
                                  <td className="px-4 py-2 font-semibold">
                                    {(q.total_cents / 100).toFixed(2)}{" "}
                                    {q.currency}
                                  </td>
                                  <td className="px-4 py-2">
                                    {new Date(q.valid_until).toLocaleString()}
                                  </td>
                                  <td className="px-4 py-2">
                                    <button
                                      onClick={() =>
                                        fetchQuotationDetail(q.quotation_id)
                                      }
                                      className="text-indigo-700 hover:text-indigo-900 text-sm font-semibold"
                                    >
                                      View Details
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Quotation Detail Modal */}
      {selectedQuotation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full space-y-4 relative">
            <button
              onClick={() => setSelectedQuotation(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold text-gray-900">
              Quotation from {selectedQuotation.shop_name}
            </h3>
            <p className="text-sm text-gray-700">
              Status: <span className="font-medium">{selectedQuotation.status}</span>
            </p>
            <p className="text-sm text-gray-700">
              Message:{" "}
              {selectedQuotation.message_to_customer || "No message provided"}
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse bg-white border">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-900 text-sm uppercase tracking-wider">
                    <th className="px-4 py-2">Service</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Qty</th>
                    <th className="px-4 py-2">Unit Price</th>
                    <th className="px-4 py-2">Line Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedQuotation.items.map((item, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-2">{item.service_name}</td>
                      <td className="px-4 py-2">{item.description}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">
                        {(item.unit_price_cents / 100).toFixed(2)}{" "}
                        {selectedQuotation.currency}
                      </td>
                      <td className="px-4 py-2 font-semibold">
                        {(item.line_total_cents / 100).toFixed(2)}{" "}
                        {selectedQuotation.currency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-right space-y-1">
              <p>
                Subtotal: {(selectedQuotation.subtotal_cents / 100).toFixed(2)}{" "}
                {selectedQuotation.currency}
              </p>
              <p>
                Tax: {(selectedQuotation.tax_cents / 100).toFixed(2)}{" "}
                {selectedQuotation.currency}
              </p>
              <p className="font-bold">
                Total: {(selectedQuotation.total_cents / 100).toFixed(2)}{" "}
                {selectedQuotation.currency}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
