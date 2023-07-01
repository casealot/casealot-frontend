import styled from "styled-components";

const BestSellerSection = styled.div`
  display: block;
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
    src: "https://scontent-ssn1-1.cdninstagram.com/v/t51.29350-15/334213629_124621657072490_4920490927059245181_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=qICEXiVqDEcAX-E28pT&_nc_ht=scontent-ssn1-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfAv9sOJKQgAn_N0qecmpoOahLsfrDkis-Jrti6NeFsmJQ&oe=64A53D0E",
  },
  {
    id: "2",
    src: "https://scontent-ssn1-1.cdninstagram.com/v/t51.29350-15/300181682_137613388968202_3745369359263272368_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=ApCb8-Ros0cAX8JxCG6&_nc_ht=scontent-ssn1-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCT8qgAb51OQOf-CxMEIre3kqD5tziNO-2v7rapIdI3Bw&oe=64A3F2C9",
  },
  {
    id: "3",
    src: "https://scontent-ssn1-1.cdninstagram.com/v/t51.29350-15/334275254_210980271484483_8344564944808809869_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=kjCIua1dtPwAX_dM9Ax&_nc_ht=scontent-ssn1-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfB__4cRiiIR1j0WiD-Z3WZZUXdaJ0n0qnEPKhWRaXBCKg&oe=64A5417C",
  },
  {
    id: "4",
    src: "https://scontent-ssn1-1.cdninstagram.com/v/t51.29350-15/340816948_952547822826793_9115457455720382022_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=cHSSCQdcstsAX-bB9hr&_nc_oc=AQlgEyPVdoEJoNGAsaKlgm3Zgd0am31Gsl3m9kPxE045UHjGCCmyxXPWndF-4EvD2po&_nc_ht=scontent-ssn1-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfBdpgNZdaO62cxFB2Z1RuY-QRyT5zb6LLqPU-godNdU_A&oe=64A41EC4",
  },
  {
    id: "5",
    src: "https://scontent-ssn1-1.cdninstagram.com/v/t51.29350-15/275645630_503287861429152_5813362392657112991_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=TCfuCNTYwOsAX-EnvKg&_nc_oc=AQmmG72f2Fj6t9wPcQIEwS6opxCAcj0y8D8txv0RZQ-82_cSbN7ayk6BHpyWeF0qV5I&_nc_ht=scontent-ssn1-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCCQ4_7ZqhcfL-rd54JTcry9zoKfxDsb_Mw5ceUyuow2A&oe=64A40C9A",
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
              <Product>
                <img src={item.src} width="100%" />
              </Product>
            ))}
          </ProductGrid>
        </ProductArea>
      </BestSellerSection>
    </>
  );
};

export default BestSeller;
