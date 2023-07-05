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
  }, [location.search]);

  return null;
}

export default TokenHandler;
