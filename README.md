# casealot-frontend
배포링크 - https://casealot.netlify.app/
## 사용 기술 스택🖥️
<img src="https://img.shields.io/badge/react-#61DAFB?style=for-the-badge&logo=react&logoColor=white">
### 상품, 공지, 문의, 카트 등 CRUD - Axios, React Query
- useQuery - queryKey를 사용한 특정상태값 변경에 따른 자동 재조회
- CUD API mutate 응답 완료 후, useQueryClient의 invalidateQueries를 이용한 쿼리 무효화 및 재조회
### 인피니티 스크롤 형식의 상품 목록 페이지 개발 - React-Infinite-scroll-component
- useInfiniteQuery Hook을 이용해 인피니티 스크롤을 구현하였으며, 다음 페이지 데이터 호출될 시점을 확인할IntersectionObserver가 필요하여 호환성이 좋은 라이브러리 채택
### 상품 등록 및 수정 페이지 개발 - ReactQuill
- React와의 호환성이 좋으며, 편집 기능이 풍부하고 커스터마이징이 가능, 무엇보다 멀티 브라우저 플랫폼을 지원하여 브라우저 호환성이 높아서 채택
### 배포 자동화 - Netlify
- 초기에는 gh-pages로 배포 브랜치를 따로 사용하였으나, 정적 페이지만 지원되는 단점을 해결하기 위해 동적 배포 + 자동화가 지원되는 Netlify 채택

## ✨ 프로젝트 주요기능

## 👤 Admin

- Product
    - 상품 등록, 수정, 삭제
- QnA
    - 문의 답변 등록
    - 답변 대기중 문의 조회
- Notice
    - 공지 등록, 수정, 삭제
- TODO
  - 전체 QnA 조회
  - 전체 리뷰 조회
  - 주간 수익 조회
  - 신규 주문 조회

## 👥 User

- Product
    - 상품 조회, 상세 조회
    - 상품 필터링 정렬
    - 상품 검색
    - 검색 자동완성
- REVIEW
  - 리뷰 내용, 별점 등록 
  - 리뷰 내용, 별점 수정
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
- ORDER
  - 주문 생성, 취소, 조회
- PAYMENT
  - 결제 요청, 내역 조회 
- DELIVERY
  - 배송 내역 조회
