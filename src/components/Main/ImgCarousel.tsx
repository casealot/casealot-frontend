import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../dummy/img/carousel1.jpg";
import img2 from "../../dummy/img/carousel2.jpg";
import img3 from "../../dummy/img/carousel3.jpg";

const ImgCarousel = () => {
  const settings = {
    dots: true, // 캐러셀 밑에 ... 을 표시할지
    infinite: true, // 슬라이드가 끝까지 가면 다시 처음으로 반복
    speed: 2000, // 속도
    autoplay: true, // 자동 재생
    autoplaySpeed: 3000, // 자동 재생 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한 번에 넘어가는 슬라이드 개수
  };

  return (
    <>
      <div>
        <Slider {...settings}>
          <div>
            <img src={img1} width="100%" />
          </div>
          <div>
            <img src={img2} width="100%" />
          </div>
          <div>
            <img src={img3} width="100%" />
          </div>
        </Slider>
      </div>
    </>
  );
};
export default ImgCarousel;
