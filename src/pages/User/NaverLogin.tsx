const NaverLogin = () => {
  const requestURL = "https://casealot.shop/oauth2/authorization/kakao";
  return (
    <>
      <img
        alt="카카오 로그인"
        src={KakaoLoginImg}
        width="100%"
        style={{ margin: "0 auto", cursor: "pointer" }}
        onClick={() => (window.location.href = requestURL)}
      />
    </>
  );
};

export default NaverLogin;
