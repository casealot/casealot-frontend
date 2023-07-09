import NavelLoginImg from "../../dummy/img/naver.png";
const NaverLogin = () => {
  const requestURL = "https://casealot.shop/oauth2/authorization/naver";
  return (
    <>
      <img
        alt="네이버 로그인"
        src={NavelLoginImg}
        style={{
          margin: "0 auto",
          cursor: "pointer",
          width: "49%",
        }}
        onClick={() => (window.location.href = requestURL)}
      />
    </>
  );
};

export default NaverLogin;
