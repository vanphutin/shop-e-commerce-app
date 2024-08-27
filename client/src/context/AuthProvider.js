import React, { createContext, useState, useEffect } from "react";

// Tạo Context cho AuthProvider
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch(
            "https://shop-e-commerce-app.onrender.com/api/v1/auth/verifyToken",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // ("res", res);
          if (res.ok) {
            const result = await res.json();
            // ("API response:", result); // In ra phản hồi từ API để kiểm tra
            if (result && result.user) {
              setUser(result.user);
            } else {
              console.error("Invalid response format or missing user data");
              setUser(null);
            }
          } else {
            localStorage.removeItem("token");
            setUser(null);
          }
        } catch (error) {
          console.error("Failed to verify token:", error);
          setUser(null);
        }
      }
    };

    verifyToken();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
