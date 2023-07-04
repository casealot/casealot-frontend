import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function TokenHandler() {
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    console.log("Token:", token);
  }, [location.search]);

  return null;
}

export default TokenHandler;
