/**
 * Centralized API service for communicating with the portfolio backend.
 * Automatically attaches the JWT authorization token for authenticated admin requests.
 */

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '') || '/api';

export const getAuthToken = () => {
  return sessionStorage.getItem('admin_token') || localStorage.getItem('admin_token');
};

export const setAuthToken = (token, remember = false) => {
  if (token) {
    sessionStorage.setItem('admin_token', token);
    if (remember) {
      localStorage.setItem('admin_token', token);
    }
  } else {
    sessionStorage.removeItem('admin_token');
    localStorage.removeItem('admin_token');
  }
};

export const clearAuthToken = () => {
  sessionStorage.removeItem('admin_token');
  localStorage.removeItem('admin_token');
};

export async function apiRequest(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
  const headers = { ...options.headers };

  const token = getAuthToken();
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Do not set Content-Type if sending FormData (browser sets boundary automatically)
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const res = await fetch(url, { ...options, headers });
    const isJson = (res.headers.get('content-type') || '').includes('application/json');
    const data = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      const errorMsg = (typeof data === 'object' && data.error) || data.message || `Request failed with status ${res.status}`;
      const err = new Error(errorMsg);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (err) {
    throw err;
  }
}

export default apiRequest;

