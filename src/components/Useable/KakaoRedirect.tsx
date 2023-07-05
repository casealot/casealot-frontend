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
    if (token && refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessToken", token);
      navigate("/");
    }
    const storedToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedToken && storedRefreshToken) {
      // Tokens are present in local storage, navigate to the main screen or desired route
      navigate("/");
    }
  }, [location.search]);

  return null;
}

export default TokenHandler;
