"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setAuth = useAuthStore((state) => state.setUser);
  const clearAuthStore = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const isAuthenticated = await checkSession();

        if (isAuthenticated) {
          const user = await getMe();
          if (user) setAuth(user);
        } else {
          clearAuthStore();
        }
      } catch (err) {
        clearAuthStore();
      }
    };

    initAuth();
  }, [setAuth, clearAuthStore]);

  return <>{children}</>;
};

export default AuthProvider;
