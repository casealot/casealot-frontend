import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function TokenHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    const refreshToken = new URLSearchParams(location.search).get(
      "refreshToken"
    );
    const role = new URLSearchParams(location.search).get("role");
    if (token && refreshToken && role) {
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessToken", token);
      localStorage.setItem("role", role);
      
    }
    const storedToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedRoleType = localStorage.getItem("role");

    if (storedToken && storedRefreshToken && storedRoleType) {
      navigate("/");
    }
  }, [location.search, navigate]);

  return null;
}

export default TokenHandler;
