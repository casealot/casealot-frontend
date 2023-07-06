import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { accessTokenState, isLoggedInSelector } from "../../atom/User";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";

function TokenHandler() {
  const isLoginLoadable = useRecoilValueLoadable(isLoggedInSelector);
  const location = useLocation();
  const navigate = useNavigate();
  const setAccessToken = useSetRecoilState(accessTokenState);

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
      setAccessToken(token);
    }

    const storedToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedRoleType = localStorage.getItem("role");

    if (
      isLoginLoadable.state === "hasValue" &&
      storedToken &&
      storedRefreshToken &&
      storedRoleType
    ) {
      navigate("/");
    }
  }, [isLoginLoadable, location.search, navigate, setAccessToken]);

  return null;
}

export default TokenHandler;
