import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // Pastikan setUser berasal dari useState

  // Fungsi untuk refresh access token
  const refreshAccessToken = async () => {
    try {
      const response = await fetch("http://localhost:5000/token", {
        method: "GET",
        credentials: "include", // Kirim cookie bersama permintaan
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      setToken(data.accessToken);

      // Ambil data user
      const userData = await fetchUserData(data.accessToken);
      setUser(userData);

      return data.accessToken;
    } catch (error) {
      console.error("Gagal refresh token:", error);
      logout();
    }
  };

  // Fungsi untuk mengambil data user
  const fetchUserData = async (accessToken) => {
    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      return data; // Return data user
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };

   // Fungsi untuk update profile
   const UpdateUser = async (profileData) => {
    try {
      let currentToken = token;

      // Cek apakah token sudah kedaluwarsa atau tidak valid
      if (!currentToken) {
        console.log("Token expired, refreshing...");
        currentToken = await refreshAccessToken(); // Refresh token jika token kosong
      }

      const response = await fetch('http://localhost:5000/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`, // Gunakan token yang baru atau masih valid
        },
        body: JSON.stringify(profileData),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setToken(data.accessToken); // Update token dengan token yang baru

      // Ambil data pengguna setelah profil diupdate
      const userData = await fetchUserData(data.accessToken);
      setUser(userData);
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error('Gagal update profile:', error);
    }
  };



  // Login: Menyimpan token dan data user
  const login = (tokenData, userData) => {
    setToken(tokenData);
    setUser(userData);
    console.log("Login berhasil:", userData);
  };

  // Logout: Membersihkan token dan data user
  const logout = () => {
    setToken(null);
    setUser(null);
    console.log("User logged out");
  };

  // Refresh token saat aplikasi dimuat
  useEffect(() => {
    refreshAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser, login, logout, UpdateUser }}>
    {children}
</AuthContext.Provider>


  );
};

export const useAuth = () => useContext(AuthContext);
