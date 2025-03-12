import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Fungsi refresh token otomatis
  const refreshAccessToken = async () => {
    try {
      console.log("🔄 Mencoba refresh token...");

      const response = await fetch("http://localhost:5000/token", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      console.log("✅ Token diperbarui:", data.accessToken);
      setToken(data.accessToken);
      localStorage.setItem("token", data.accessToken);

      const userData = await fetchUserData(data.accessToken);
      setUser(userData);

      return data.accessToken;
    } catch (error) {
      console.error("❌ Gagal refresh token:", error);
      logout();
      return null;
    }
  };

  // 👤 Ambil data user dengan auto-refresh token jika expired
  const fetchUserData = async (accessToken) => {
    try {
      let currentToken = accessToken || token;

      const response = await fetch("http://localhost:5000/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.status === 403) {
        console.warn("⚠️ Token expired, mencoba refresh...");
        currentToken = await refreshAccessToken();
        if (!currentToken) return null;

        const retryResponse = await fetch("http://localhost:5000/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });

        if (!retryResponse.ok) {
          throw new Error("Gagal mengambil data user setelah refresh token");
        }

        return await retryResponse.json();
      }

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Gagal mengambil data user:", error);
      return null;
    }
  };

  // 🔄 Ambil data admin
  const fetchAdminData = async () => {
    try {
      if (!token) {
        console.warn("⚠️ Token tidak tersedia, mencoba refresh...");
        const newToken = await refreshAccessToken();
        if (!newToken) return;
      }

      const response = await fetch("http://localhost:5000/get-admin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data admin");
      }

      const data = await response.json();
      setAdminData(data);
      console.log("✅ Data admin berhasil diambil:", data);
    } catch (error) {
      console.error("❌ Gagal mengambil data admin:", error);
    }
  };

  // 🔄 Fungsi untuk update profil user
  const updateUser = async (profileData) => {
    try {
      let currentToken = token;

      if (!currentToken) {
        console.log("⚠️ Token expired, mencoba refresh...");
        currentToken = await refreshAccessToken();
        if (!currentToken) return;
      }

      const response = await fetch("http://localhost:5000/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify(profileData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setToken(data.accessToken);
      localStorage.setItem("token", data.accessToken);

      const userData = await fetchUserData(data.accessToken);
      if (userData) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }

      console.log("✅ Profil berhasil diperbarui!");
    } catch (error) {
      console.error("❌ Gagal update profile:", error);
    }
  };

  // 🔑 Login: Simpan token, user data, dan role
  const login = (tokenData, userData) => {
    setToken(tokenData);
    setUser(userData);
    localStorage.setItem("token", tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("✅ Login berhasil:", userData);
  };

  // 🚪 Logout: Hapus token, user data, dan role
  const logout = () => {
    setToken(null);
    setUser(null);
    setAdminData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("🚪 User logged out");
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (token) {
        const newToken = await refreshAccessToken();
        if (!newToken) {
          console.warn("⚠️ Token expired, user tetap login tetapi butuh refresh manual.");
        }
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (token) {
      fetchAdminData();
    }
  }, [token]);

  if (loading) return <p>Loading...</p>;

  return (
    <AuthContext.Provider value={{ token, user, adminData, login, logout, updateUser, refreshAccessToken, fetchAdminData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
