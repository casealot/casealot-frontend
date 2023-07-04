import axios from "axios";
import KakaoLoginImg from "../../dummy/img/kakaologin.png";

const KakaoLogin = () => {
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
