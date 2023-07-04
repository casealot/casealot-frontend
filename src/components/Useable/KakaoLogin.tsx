import axios from "axios";
import { redirectURI } from "../../atom/User";
import KakaoLoginImg from "../../dummy/img/kakaologin.png";

const handleLoginSuccess = (token: string, refreshToken: string) => {
  // 추출한 토큰 값을 활용하여 필요한 작업을 수행합니다.
  // 예: 서버에 토큰 전송, 로컬 스토리지에 토큰 저장 등
  console.log("Token:", token);
  console.log("Refresh Token:", refreshToken);

  // 작업 완료 후 다음 경로로 이동
  // 예: history.push("/dashboard");
};

const KakaoLogin = () => {
  const REDIRECT_URI = redirectURI;
  const kakaoURL = "https://casealot.shop/oauth2/authorization/kakao";

  const handleKaKaoLogin = async () => {
    console.log("Before request"); // 요청 전에 출력
    const response = await axios.post(
      "https://casealot.shop/oauth2/authorization/kakao"
    );
    console.log("After request"); // 요청 후에 출력
    // 로그인 성공 후 리다이렉트된 URL 가져오기
    const redirectUrl = response.request.responseURL;

    // URL의 쿼리 파라미터 추출
    const urlParams = new URLSearchParams(new URL(redirectUrl).search);

    // 토큰 값 가져오기
    const token = urlParams.get("token");
    const refreshToken = urlParams.get("refreshToken");

    // 토큰 값을 사용하여 원하는 작업 수행
    console.log(token);
    console.log(refreshToken);
  };

  return (
    <img
      alt="카카오 로그인"
      src={KakaoLoginImg}
      width="100%"
      style={{ margin: "0 auto", cursor: "pointer" }}
      onClick={handleKaKaoLogin}
    />
  );
};

export default KakaoLogin;
