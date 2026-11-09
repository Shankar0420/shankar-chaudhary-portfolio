/**
 * Centralized API service for communicating with the portfolio backend.
 * Automatically attaches the JWT authorization token for authenticated admin requests.
 */

export function resolveApiBase() {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/+$/, '');
  }

  // Detect Render production domain or any hosted static domain
  if (typeof window !== 'undefined' && window.location) {
    const hostname = window.location.hostname;
    if (
      hostname === 'shankar-chaudhary-portfolio-site.onrender.com' ||
      hostname.endsWith('.onrender.com')
    ) {
      return 'https://shankar-chaudhary-portfolio.onrender.com/api';
    }
  }

  // Local development / fallback
  return '/api';
}

/**
 * Resolves static asset URLs (such as /uploads/**) to the full backend origin if running on static host.
 */
export function resolveAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const apiBase = resolveApiBase();
  if (apiBase.startsWith('http')) {
    const origin = apiBase.replace(/\/api\/?$/, '');
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${origin}${cleanPath}`;
  }
  return path;
}

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
  const apiBase = resolveApiBase();
  const url = endpoint.startsWith('http') ? endpoint : `${apiBase}${endpoint}`;
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
    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await res.json() : await res.text();

    // Guard: If response is HTML (e.g. static server fallback to index.html instead of backend API response)
    if (!isJson && typeof data === 'string' && data.trim().startsWith('<!DOCTYPE html')) {
      throw new Error(`API endpoint not reachable at ${url}. The server returned an HTML page instead of API JSON. Check your backend service status.`);
    }

    if (!res.ok) {
      const errorMsg = (typeof data === 'object' && (data.error || data.message)) ||
        (typeof data === 'string' && data.length < 200 ? data : null) ||
        `Request failed with status ${res.status}`;
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

