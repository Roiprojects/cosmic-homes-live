"use client";

import { useState, useEffect, useCallback } from "react";

const ADMIN_PASSWORD = "cosmic2025";
const AUTH_KEY = "cosmic_homes_admin_auth";

type Enquiry = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  location: string;
  plotSize: string;
  builtUpArea: string;
  floors: string;
  expectedStartDate: string;
  message: string;
  source: string;
  createdAt: string;
};

function exportCSV(enquiries: Enquiry[]) {
  const headers = ["Name", "Mobile", "Email", "Location", "Plot Size", "Built-up Area", "Floors", "Start Date", "Message", "Source", "Date"];
  const rows = enquiries.map((e) => [
    e.name, e.mobile, e.email, e.location, e.plotSize, e.builtUpArea, e.floors, e.expectedStartDate, e.message, e.source, e.createdAt,
  ]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `enquiries_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [enquiries, setEnquiries] = useState([] as Enquiry[]);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null as Enquiry | null);

  const loadEnquiries = useCallback(async () => {
    try {
      const res = await fetch("/api/lead");
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error("Failed to load enquiries:", err);
    }
  }, []);

  useEffect(() => {
    const session = sessionStorage.getItem(AUTH_KEY);
    if (session === "true") {
      setAuthenticated(true);
      loadEnquiries();
    }
  }, [loadEnquiries]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setLoginError("");
      sessionStorage.setItem(AUTH_KEY, "true");
      loadEnquiries();
    } else {
      setLoginError("Incorrect password.");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPassword("");
    sessionStorage.removeItem(AUTH_KEY);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry permanently?")) return;
    try {
      await fetch(`/api/lead?id=${id}`, { method: "DELETE" });
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const handleClearAll = async () => {
    if (!confirm("Delete ALL enquiries? This cannot be undone.")) return;
    try {
      await fetch("/api/lead?clearAll=true", { method: "DELETE" });
      setEnquiries([]);
      setSelected(null);
    } catch (err) {
      console.error("Failed to clear:", err);
    }
  };

  const filtered = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(filter.toLowerCase()) ||
      e.mobile.includes(filter) ||
      e.email.toLowerCase().includes(filter.toLowerCase()) ||
      e.location.toLowerCase().includes(filter.toLowerCase())
  );

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
          <h1 className="font-heading text-2xl font-bold text-navy mb-1">Admin Panel</h1>
          <p className="text-navy-muted text-sm mb-6">Enter the admin password to continue.</p>
          {loginError && <p className="text-red-500 text-sm mb-3">{loginError}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
            autoFocus
          />
          <button type="submit" className="w-full bg-navy text-white font-semibold py-3 rounded-xl hover:bg-navy-700 transition-colors">
            Sign In
          </button>

          {/* Credentials Display */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Login Credentials</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">User ID:</span>
                <span className="text-navy font-semibold">admin</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Password:</span>
                <span className="text-navy font-semibold">cosmic2025</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-900 text-white flex flex-col shrink-0">
        <div className="p-6">
          <h1 className="font-heading text-xl font-bold text-gold">Cosmic Homes</h1>
          <p className="text-white/50 text-xs mt-1 tracking-widest uppercase">Admin Panel</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-2">
          <button
            className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors bg-white text-navy-900"
          >
            Enquiries
          </button>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500/20 text-red-300 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-heading font-bold text-navy-900 capitalize">
              Customer Enquiries
            </h2>
            
            <button
              onClick={async () => { await loadEnquiries(); alert("Enquiries refreshed."); }}
              className="px-4 py-2 bg-navy-900 text-white rounded-lg text-sm font-medium hover:bg-navy-800 transition-colors shadow-sm"
            >
              Refresh Data
            </button>
          </div>
          
          <>
            {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-navy-muted text-xs uppercase tracking-wider mb-1">Total</p>
            <p className="font-heading text-2xl font-bold text-navy">{enquiries.length}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-navy-muted text-xs uppercase tracking-wider mb-1">Today</p>
            <p className="font-heading text-2xl font-bold text-navy">
              {enquiries.filter((e) => new Date(e.createdAt).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-navy-muted text-xs uppercase tracking-wider mb-1">This Week</p>
            <p className="font-heading text-2xl font-bold text-navy">
              {
                enquiries.filter((e) => {
                  const d = new Date(e.createdAt);
                  const now = new Date();
                  const week = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                  return d >= week;
                }).length
              }
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-navy-muted text-xs uppercase tracking-wider mb-1">This Month</p>
            <p className="font-heading text-2xl font-bold text-navy">
              {
                enquiries.filter((e) => {
                  const d = new Date(e.createdAt);
                  const now = new Date();
                  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                }).length
              }
            </p>
          </div>
        </div>

        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search by name, phone, email, or location..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
          />
          <button
            onClick={() => exportCSV(filtered)}
            disabled={filtered.length === 0}
            className="px-5 py-3 bg-teal-500 text-white font-semibold text-sm rounded-xl hover:bg-teal-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Export CSV
          </button>
          <button
            onClick={handleClearAll}
            disabled={enquiries.length === 0}
            className="px-5 py-3 bg-red-500 text-white font-semibold text-sm rounded-xl hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Clear All
          </button>
        </div>

        {/* Enquiries table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-navy-muted text-sm">No enquiries found.</p>
              {enquiries.length === 0 && <p className="text-gray-400 text-xs mt-2">Enquiries from the contact form will appear here.</p>}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-5 py-3 text-navy-muted font-medium text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left px-5 py-3 text-navy-muted font-medium text-xs uppercase tracking-wider">Mobile</th>
                    <th className="text-left px-5 py-3 text-navy-muted font-medium text-xs uppercase tracking-wider hidden sm:table-cell">Email</th>
                    <th className="text-left px-5 py-3 text-navy-muted font-medium text-xs uppercase tracking-wider">Location</th>
                    <th className="text-left px-5 py-3 text-navy-muted font-medium text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
                    <th className="text-right px-5 py-3 text-navy-muted font-medium text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      onClick={() => setSelected(enquiry)}
                      className={`cursor-pointer transition-colors hover:bg-gray-50 ${selected?.id === enquiry.id ? "bg-gold/5" : ""}`}
                    >
                      <td className="px-5 py-3.5 font-medium text-navy">{enquiry.name}</td>
                      <td className="px-5 py-3.5 text-navy-muted">{enquiry.mobile}</td>
                      <td className="px-5 py-3.5 text-navy-muted hidden sm:table-cell">{enquiry.email || "—"}</td>
                      <td className="px-5 py-3.5 text-navy-muted">{enquiry.location}</td>
                      <td className="px-5 py-3.5 text-navy-muted hidden md:table-cell">
                        {new Date(enquiry.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(enquiry.id); }}
                          className="text-red-400 hover:text-red-600 text-xs font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        </>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <h2 className="font-heading text-xl font-bold text-navy">Enquiry Details</h2>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-navy transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                {[
                  ["Full Name", selected.name],
                  ["Mobile", selected.mobile],
                  ["Email", selected.email || "—"],
                  ["Location", selected.location],
                  ["Plot Size", selected.plotSize || "—"],
                  ["Built-up Area", selected.builtUpArea || "—"],
                  ["Floors", selected.floors || "—"],
                  ["Expected Start", selected.expectedStartDate || "—"],
                  ["Message", selected.message || "—"],
                  ["Source", selected.source],
                  ["Submitted", new Date(selected.createdAt).toLocaleString("en-IN")],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-navy-muted text-xs uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-navy text-sm font-medium break-words">{value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <a href={`tel:${selected.mobile}`} className="flex-1 bg-teal-500 text-white text-center font-semibold py-3 rounded-xl hover:bg-teal-600 transition-colors text-sm">
                  Call Now
                </a>
                <button onClick={() => handleDelete(selected.id)} className="flex-1 bg-red-500 text-white font-semibold py-3 rounded-xl hover:bg-red-600 transition-colors text-sm">
                  Delete Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  );
}
