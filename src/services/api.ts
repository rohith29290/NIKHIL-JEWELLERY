import { GoldRate, Appointment, AppointmentFormData } from '../types';

const API_BASE = '/api';

export const apiService = {
  // Fetch Today's Gold Rate
  getGoldRate: async (): Promise<GoldRate> => {
    const res = await fetch(`${API_BASE}/gold-rate`);
    const json = await res.json();
    if (!res.ok || !json.success || !json.data) {
      throw new Error(json.error || 'Live gold price temporarily unavailable.');
    }
    return json.data;
  },

  // Trigger Live Refresh
  refreshGoldRate: async (): Promise<GoldRate> => {
    const res = await fetch(`${API_BASE}/gold-rate/refresh`, { method: 'POST' });
    const json = await res.json();
    if (!res.ok || !json.success || !json.data) {
      throw new Error(json.error || 'Live gold price temporarily unavailable.');
    }
    return json.data;
  },

  // Admin Update Gold Rate
  updateGoldRate: async (data: Partial<GoldRate>): Promise<GoldRate> => {
    const res = await fetch(`${API_BASE}/gold-rate/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error('Failed to update gold rate');
    }
    const json = await res.json();
    return json.data;
  },

  // Fetch All Appointments (Admin)
  getAppointments: async (): Promise<Appointment[]> => {
    const res = await fetch(`${API_BASE}/appointments`);
    if (!res.ok) {
      throw new Error('Failed to fetch appointments');
    }
    const json = await res.json();
    return json.data;
  },

  // Book Appointment (User)
  bookAppointment: async (formData: AppointmentFormData): Promise<Appointment> => {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Failed to book appointment');
    }
    return json.data;
  },

  // Delete Appointment (Admin)
  deleteAppointment: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE}/appointments/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error || 'Failed to delete appointment');
    }
  },
};
