
# 개요
비즈니스의 동작 방식에 대해 알아보고자 대표적인 서비스인 전자상거래 만들어 보았습니다.

쇼핑몰은 많은 노출이 필요한 서비스이므로 SEO에 강력한 SSR 방식으로 구현하였습니다.

# 기술 스택
- TypeScript , tailwind.css
- Nuxt3 , pinia
- Deploy : on-premise


# 리팩토링 목록
- [ o ] version 업 , 최적화
- [ ] 서버 상태 , 전역 성태 관리 분리
  - 첫 페이지 접근시 reflow 되는 문제 : 서버에서 받은 html와 hydration 과정후 생성된 콘텐츠의 차이때문에 reflow 가생기는 문제
  - 
- [ ] 서버 작업과 클라이언트 작업 분리

