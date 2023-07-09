import NavelLoginImg from "../../dummy/img/naverlogin.png";
const NaverLogin = () => {
  const requestURL = "https://casealot.shop/oauth2/authorization/naver";
  return (
    <>
      <img
        alt="네이버 로그인"
        src={NavelLoginImg}
        width="100%"
        style={{ margin: "0 auto", cursor: "pointer" }}
        onClick={() => (window.location.href = requestURL)}
      />
    </>
  );
};

export default NaverLogin;
