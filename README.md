# casealot-frontend

배포링크 - https://casealot.netlify.app/

## 사용 기술 스택🖥️
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=black"> <img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=black">  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=black"> <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=black"> <img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=black"> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=black"> <img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=black"> 


### 상품, 공지, 문의, 카트 등 CRUD - Axios, React Query
- useQuery - queryKey를 사용한 특정상태값 변경에 따른 자동 재조회
- CUD API mutate 응답 완료 후, useQueryClient의 invalidateQueries를 이용한 쿼리 무효화 및 재조회
### 인피니티 스크롤 형식의 상품 목록 페이지 개발 - React-Infinite-scroll-component
- useInfiniteQuery Hook을 이용해 인피니티 스크롤을 구현하였으며, 다음 페이지 데이터 호출될
시점을 확인할IntersectionObserver가 필요하여 호환성이 좋은 라이브러리 채택
### 상품 등록 및 수정 페이지 개발 - ReactQuill
- React와의 호환성이 좋으며, 편집 기능이 풍부하고 커스터마이징이 가능, 무엇보다 멀티 브라우저 플랫폼을 지원하여 브라우저 호환성이 높아서 채택
### 배포 자동화 - Netlify
- 초기에는 gh-pages로 배포 브랜치를 따로 사용하였으나, 정적 페이지만 지원되는 단점을 해결하기 위해 동적 배포 + 자동화가 지원되는 Netlify 채택
### 컴포넌트 디자인 - styled-components & Mui-v5
- 디자이너가 없다는 점과 프론트엔드 개발을 혼자한다는 점을 고려하여 템플릿을 사용하려 했으나 CSS 다루는 법에 더 익숙해지고 싶었고, 초기 뼈대부터 직접 잡아가며 
CSS에 대한 이해도를 높이고 싶어 Mui-v5 Components + styledcomponents 사용
- Mui-v5 가 생각보다 제공되는 기능, 디자인이 많지않으며 커스터마이징 과정에서 상당한 오류코드, 자체 제공하는 컴포넌트에서 렌더링 오류가 발생해
  사용 하기가 생각보다 불편했다.
## ✨ 프로젝트 주요기능

## 👤 Admin

- Product
    - 상품 등록, 수정, 삭제
    - 주간 수익 조회
    - 신규 주문 조회
- QnA
    - 전체 QnA 조회
    - 문의 답변 등록, 답변 수정, 삭제
    - 답변 대기중 문의 조회
- Notice
    - 공지 등록, 수정, 삭제
- Review
    - 전체 리뷰 조회

## 👥 User

- Product
    - 상품 조회, 상세 조회
    - 상품 필터링 정렬
    - 상품 검색
    - 검색 자동완성
- REVIEW
  - 리뷰 내용, 별점 등록 
  - 리뷰 삭제, 조회
- CART
  - 장바구니 상품 등록, 삭제, 조회
  - 상품 수량 변경, 삭제 
- WISHLIST
  - 위시리스트 상품 등록, 삭제, 조회
- Q&A
  - QnA 등록, 삭제, 조회, 상세 조회
  - QnA 제목, 내용 수정
- NOTICE
  - 공지 조회, 상세 조회
  - 공지 댓글 등록, 수정, 삭제
- ORDER
  - 주문 생성, 취소, 조회
- PAYMENT
  - 결제 요청, 내역 조회 
- DELIVERY
  - 배송 내역 조회
    
# 회고 및 트러블슈팅
- Mutation, QueryClient 사용해 데이터 동기화하기 - https://velog.io/@tykim1227/react-query-Mutation-QueryClient-%EC%82%AC%EC%9A%A9  
- React-Query Infinite Scroll + react-infinite-scroll-components - https://velog.io/@tykim1227/React-Query-Infinite-Scroll-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
- infiniteScroll 오류 해결 + useMutation에 익숙해지기 - https://velog.io/@tykim1227/infiniteScroll-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0-useMutation%EA%B3%BC-%EC%B9%9C%ED%95%B4%EC%A7%80%EA%B8%B0
- Mutation을 사용해 상품 필터링 기능 구현 - https://velog.io/@tykim1227/mutation%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%9C-%ED%95%84%ED%84%B0%EB%A7%81-%EA%B8%B0%EB%8A%A5-%EB%A7%8C%EB%93%A4%EA%B8%B0
- 카카오 로그인 - https://velog.io/@tykim1227/React-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
- 포트원을 사용한 결제모듈, 결제처리 - https://velog.io/@tykim1227/PORTONE-%EA%B2%B0%EC%A0%9C%EB%AA%A8%EB%93%88-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0
- 검색어 HighLights + 검색기능 - https://velog.io/@tykim1227/HighLights-%EA%B2%80%EC%83%89%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84

