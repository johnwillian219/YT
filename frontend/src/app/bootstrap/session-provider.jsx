//frontend/src/app/bootstrap/session-provider.jsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  getToken,
  saveToken,
  clearToken,
} from "@/domains/auth/infrastructure/auth.storage";

import {
  loginRequest,
  registerRequest,
  meRequest,
} from "@/domains/auth/infrastructure/auth.api";

/**
 * Context
 */
const SessionContext = createContext(null);

/**
 * Hook
 */
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used inside SessionProvider");
  }
  return context;
};

/**
 * Provider
 */
export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Logout
   */
  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  /**
   * Load session (on app start / refresh)
   */
  const loadSession = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await meRequest();
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  /**
   * Login
   */
  const login = async (credentials) => {
    const { data } = await loginRequest(credentials);

    saveToken(data.accessToken);
    setUser(data.user);
    setIsAuthenticated(true);
  };

  /**
   * Register
   */
  const register = async (payload) => {
    const { data } = await registerRequest(payload);

    saveToken(data.accessToken);
    setUser(data.user);
    setIsAuthenticated(true);
  };

  /**
   * Initial session load
   */
  useEffect(() => {
    loadSession();
  }, [loadSession]);

  return (
    <SessionContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
