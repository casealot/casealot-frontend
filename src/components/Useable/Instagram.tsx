import pinkcapImg from "../../dummy/img/pinkcap.gif";
const Instagram = () => {
  return (
    <div
      style={{
        bottom: "130px",
        left: "50px",
        position: "fixed",
      }}
    >
      <a href="https://www.instagram.com/casealot_official/" target="_blank">
        <img
          src={pinkcapImg}
          alt="Instagram Photo"
          style={{ width: "100px", height: "100px", position: "absolute" }}
        />
      </a>
    </div>
  );
};

export default Instagram;
