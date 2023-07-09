import styled from "styled-components";

const BestSellerSection = styled.div`
  margin-top: 650px;

  @media (max-width: 768px) {
    margin-top: 500px;
  }

  @media (max-width: 480px) {
    margin-top: 300px;
  }
`;

const ProductArea = styled.div`
  padding: 30px 0 40px;
  display: flex;
  justify-content: center;
`;
const ProductGrid = styled.ul`
  padding: 10px 0 0;
  display: flex;
  margin-right: 6px;
  color: #000;
`;
const Product = styled.li`
  position: relative;
  vertical-align: top;
  margin-left: 10px;
  width: 20%;
  text-align: center;
  list-style: none;
`;

const imgList = [
  {
    id: "1",
    src: "https://casealot-storage.s3.ap-northeast-2.amazonaws.com/banner/banner1.jpg",
    url: "https://www.instagram.com/p/CpmiyKBr__0/",
  },
  {
    id: "2",
    src: "https://casealot-storage.s3.ap-northeast-2.amazonaws.com/banner/banner2.jpg",
    url: "https://www.instagram.com/p/ChjClH2PrPe/",
  },
  {
    id: "3",
    src: "https://casealot-storage.s3.ap-northeast-2.amazonaws.com/banner/banner3.jpg",
    url: "https://www.instagram.com/p/CpTsomkPulU/",
  },
  {
    id: "4",
    src: "https://casealot-storage.s3.ap-northeast-2.amazonaws.com/banner/banner4.jpg",
    url: "https://www.instagram.com/p/Cq6tkO7viyW/",
  },
  {
    id: "5",
    src: "https://casealot-storage.s3.ap-northeast-2.amazonaws.com/banner/banner5.jpg",
    url: "https://www.instagram.com/p/Ca_7_QkPfmB/",
  },
];
const BestSeller = () => {
  return (
    <>
      <BestSellerSection>
        {/* <BestSellerTextArea>
          <BestSellerText>
            <AnimatedText>BEST SELLER</AnimatedText>
          </BestSellerText>
        </BestSellerTextArea> */}

        <ProductArea>
          <ProductGrid>
            {imgList.map((item) => (
              <Product key={item.id}>
                <a href={item.url} target="_blank">
                  <img
                    src={item.src}
                    width="100%"
                    style={{ aspectRatio: 1, borderRadius: "10%" }}
                  />
                </a>
              </Product>
            ))}
          </ProductGrid>
        </ProductArea>
      </BestSellerSection>
    </>
  );
};

export default BestSeller;
