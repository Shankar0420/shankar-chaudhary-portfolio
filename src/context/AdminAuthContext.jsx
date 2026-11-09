import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { portfolioApi } from '../services/portfolioApi';
import { getAuthToken, setAuthToken, clearAuthToken } from '../services/api';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getAuthToken()));
  const [admin, setAdmin] = useState(null);
  const [isInitialized, setIsInitialized] = useState(true);
  const [authorizedMobile, setAuthorizedMobile] = useState("9905340058");
  const [loading, setLoading] = useState(true);

  const checkStatus = useCallback(async () => {
    try {
      const status = await portfolioApi.checkAuthStatus();
      setIsInitialized(Boolean(status.initialized));
      if (status.authorizedMobile) {
        setAuthorizedMobile(status.authorizedMobile);
      }
    } catch {
      // Backend might be offline during front-only mode
    }
  }, []);

  const verifyCurrentToken = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      setIsAuthenticated(false);
      setAdmin(null);
      setLoading(false);
      return;
    }

    try {
      const me = await portfolioApi.getMe();
      setAdmin(me);
      setIsAuthenticated(true);
    } catch {
      clearAuthToken();
      setIsAuthenticated(false);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkStatus().then(() => verifyCurrentToken());
  }, [checkStatus, verifyCurrentToken]);

  const login = async (mobileNumber, password, remember = false) => {
    const res = await portfolioApi.login(mobileNumber, password);
    if (res.token) {
      setAuthToken(res.token, remember);
      setIsAuthenticated(true);
      setAdmin({ mobileNumber: res.mobileNumber, lastLoginAt: res.lastLoginAt });
      return res;
    }
    throw new Error(res.error || "Login failed");
  };

  const setup = async (mobileNumber, password) => {
    const res = await portfolioApi.setupAdmin(mobileNumber, password);
    setIsInitialized(true);
    return res;
  };

  const completeAuthWithToken = (token, mobileNumber, remember = true) => {
    setAuthToken(token, remember);
    setIsAuthenticated(true);
    setIsInitialized(true);
    setAdmin({ mobileNumber });
  };

  const logout = async () => {
    try {
      await portfolioApi.logout();
    } catch {
      // Ignore network errors on logout
    }
    clearAuthToken();
    setIsAuthenticated(false);
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        admin,
        isInitialized,
        authorizedMobile,
        loading,
        login,
        setup,
        completeAuthWithToken,
        logout,
        refreshStatus: checkStatus
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}

