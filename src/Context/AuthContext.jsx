import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [loading, setLoading] = useState(true); // Hindari flash logout saat refresh

  // 🔄 Fungsi refresh token otomatis
  const refreshAccessToken = async () => {
    try {
      console.log("🔄 Mencoba refresh token...");

      const response = await fetch("http://localhost:5000/token", {
        method: "GET",
        credentials: "include", // Pastikan cookie dikirim
      });

      console.log("🛠 Status Response:", response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error("🚨 Error response dari server:", errorData);
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      console.log("✅ Token berhasil diperbarui:", data.accessToken);
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
        if (!currentToken) return null; // Gagal refresh token

        // Coba lagi fetch user data
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

  // 🔄 Fungsi untuk update profile user
  const UpdateUser = async (profileData) => {
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

      // Ambil ulang data user setelah update
      const userData = await fetchUserData(data.accessToken);
      if (userData) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }

      console.log("✅ Profile updated successfully!");
    } catch (error) {
      console.error("❌ Gagal update profile:", error);
    }
  };

  // 🔑 Login: Simpan token & user data
  const login = (tokenData, userData) => {
    setToken(tokenData);
    setUser(userData);
    localStorage.setItem("token", tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("✅ Login berhasil:", userData);
  };

  // 🚪 Logout: Hapus token & user data
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("🚪 User logged out");
  };

  // Saat halaman dimuat, coba refresh token jika ada
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

  if (loading) return <p>Loading...</p>; // Hindari flash logout saat refresh

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser, login, logout, UpdateUser, refreshAccessToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
