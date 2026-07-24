import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Clock,
  TrendingUp,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  UserCheck,
  Building,
  PlusCircle,
  Sliders,
  DollarSign,
  Download,
} from 'lucide-react';
import { apiService } from '../services/api';
import { Appointment, GoldRate } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [goldRate, setGoldRate] = useState<GoldRate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterPurpose, setFilterPurpose] = useState<string>('All');

  // Gold Rate Edit Form state
  const [rate24kInput, setRate24kInput] = useState<number>(0);
  const [rate22kInput, setRate22kInput] = useState<number>(0);
  const [updatingRate, setUpdatingRate] = useState<boolean>(false);
  const [rateMessage, setRateMessage] = useState<string>('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [apps, rate] = await Promise.all([
        apiService.getAppointments(),
        apiService.getGoldRate(),
      ]);
      setAppointments(apps);
      setGoldRate(rate);
      if (rate) {
        setRate24kInput(rate.rate24k);
        setRate22kInput(rate.rate22k);
      }
    } catch (err) {
      console.error('Admin load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteAppointment = async (id: string) => {
    if (!window.confirm(`Are you sure you want to delete appointment ${id}?`)) {
      return;
    }
    try {
      await apiService.deleteAppointment(id);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete appointment');
    }
  };

  const handleUpdateGoldRate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUpdatingRate(true);
      setRateMessage('');
      const updated = await apiService.updateGoldRate({
        rate24k: Number(rate24kInput),
        rate22k: Number(rate22kInput),
      });
      setGoldRate(updated);
      setRateMessage('Gold rates updated live successfully!');
      setTimeout(() => setRateMessage(''), 3000);
    } catch (err: any) {
      alert('Failed to update gold rate: ' + err.message);
    } finally {
      setUpdatingRate(false);
    }
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.mobileNumber.includes(searchQuery) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPurpose = filterPurpose === 'All' || app.purpose === filterPurpose;

    return matchesSearch && matchesPurpose;
  });

  // Calculate Stats
  const todayStr = new Date().toISOString().split('T')[0];
  const appointmentsToday = appointments.filter((a) => a.preferredDate === todayStr).length;
  const upcomingCount = appointments.filter((a) => a.status === 'Upcoming').length;
  const totalCount = appointments.length;

  return (
    <div className="min-h-screen bg-[#F8F6F2] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="bg-[#014D40] text-white p-8 rounded-3xl shadow-xl border-2 border-[#D4AF37]/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#F3E5AB] font-semibold">Management Console</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Admin Appointment Dashboard
            </h1>
            <p className="text-xs text-gray-200 mt-1 font-light">
              Nikhil and Brother Jewellery – Meerpet, Hyderabad
            </p>
          </div>

          <button
            onClick={loadData}
            className="inline-flex items-center gap-2 bg-gold-gradient text-[#014D40] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-lg hover:scale-105 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Dashboard</span>
          </button>
        </div>

        {/* STATISTICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-gray-500">Today's Bookings</span>
              <div className="p-2.5 bg-emerald-100 text-[#014D40] rounded-xl">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <p className="font-serif text-3xl font-extrabold text-[#014D40] mt-3">{appointmentsToday}</p>
            <p className="text-[11px] text-gray-500 mt-1">Scheduled for {todayStr}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-gray-500">Upcoming Total</span>
              <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <p className="font-serif text-3xl font-extrabold text-[#014D40] mt-3">{upcomingCount}</p>
            <p className="text-[11px] text-gray-500 mt-1">Pending customer visits</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-gray-500">Total Bookings</span>
              <div className="p-2.5 bg-blue-100 text-blue-800 rounded-xl">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <p className="font-serif text-3xl font-extrabold text-[#014D40] mt-3">{totalCount}</p>
            <p className="text-[11px] text-gray-500 mt-1">In-memory appointments</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-gray-500">Live 22K Gold Rate</span>
              <div className="p-2.5 bg-[#D4AF37]/20 text-[#014D40] rounded-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="font-serif text-3xl font-extrabold text-[#014D40] mt-3">
              ₹{goldRate ? goldRate.rate22k.toLocaleString('en-IN') : '...'}/g
            </p>
            <p className="text-[11px] text-gray-500 mt-1">Hyderabad Market Rate</p>
          </div>
        </div>

        {/* LIVE GOLD RATE ADMIN MANAGER */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#D4AF37]/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#014D40] flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
                Live Gold Rate Manager
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Update today's gold prices instantly. Changes will reflect across the entire store website in real-time.
              </p>
            </div>

            {rateMessage && (
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-2 rounded-full border border-emerald-300 animate-fadeIn">
                {rateMessage}
              </span>
            )}
          </div>

          <form onSubmit={handleUpdateGoldRate} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                24K Gold Rate (₹ / gram)
              </label>
              <input
                type="number"
                value={rate24kInput}
                onChange={(e) => setRate24kInput(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-bold text-[#014D40] focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                22K Gold Rate (₹ / gram - 916)
              </label>
              <input
                type="number"
                value={rate22kInput}
                onChange={(e) => setRate22kInput(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-bold text-[#014D40] focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={updatingRate}
                className="w-full bg-[#014D40] hover:bg-[#00382E] text-[#F3E5AB] font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg transition-all"
              >
                {updatingRate ? 'Updating Live Rate...' : 'Publish Rate Update'}
              </button>
            </div>
          </form>
        </div>

        {/* APPOINTMENTS TABLE */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#D4AF37]/30 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-bold text-[#014D40] flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#D4AF37]" />
              Booked Appointments
            </h2>

            {/* Controls & Search */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search name, phone, ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* Purpose Filter */}
              <select
                value={filterPurpose}
                onChange={(e) => setFilterPurpose(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-300 text-xs font-medium text-gray-700 bg-white"
              >
                <option value="All">All Purposes</option>
                <option value="Gold Purchase">Gold Purchase</option>
                <option value="Wedding Jewellery">Wedding Jewellery</option>
                <option value="Diamond Jewellery">Diamond Jewellery</option>
                <option value="Exchange">Exchange</option>
                <option value="Repair">Repair</option>
                <option value="Consultation">Consultation</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          {loading ? (
            <div className="py-20 text-center text-gray-500 text-xs">
              Loading appointment records...
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="py-16 text-center text-gray-500 bg-[#F8F6F2] rounded-2xl border border-dashed border-gray-300 text-xs">
              No appointments found matching your filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#014D40] text-[#F3E5AB] font-serif uppercase tracking-wider text-[11px]">
                    <th className="p-4 rounded-tl-xl">ID</th>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Mobile</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Time Slot</th>
                    <th className="p-4">Purpose</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 rounded-tr-xl text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAppointments.map((app) => (
                    <tr key={app.id} className="hover:bg-[#F8F6F2] transition-colors">
                      <td className="p-4 font-bold text-[#014D40]">{app.id}</td>
                      <td className="p-4">
                        <div className="font-semibold text-gray-900">{app.fullName}</div>
                        <div className="text-[10px] text-gray-400">{app.email}</div>
                      </td>
                      <td className="p-4 font-medium text-gray-700">+91 {app.mobileNumber}</td>
                      <td className="p-4 font-bold text-gray-800">{app.preferredDate}</td>
                      <td className="p-4 text-gray-600">{app.preferredTimeSlot}</td>
                      <td className="p-4">
                        <span className="bg-[#014D40]/10 text-[#014D40] font-semibold px-2.5 py-1 rounded-full text-[10px]">
                          {app.purpose}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[10px]">
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDeleteAppointment(app.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Appointment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
