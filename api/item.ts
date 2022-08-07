interface ShopUser {
  // 아이디 등등 개인회원과 똑같은 정보
  seller: ShopUserSeller;
}

// 판매자 정보
interface ShopUserSeller {
  represent: string; //대표자
  phone: string;
  eMail: string;
  companyName: string;
  companyAddress: string;
}

export interface Iitem {
  id: number;
  thumbnailSrc: string;
  detailHtml: string;
  title: string;
  price: string;
  sale: number;
  // 판매자 유저 정보
  sellUserInfo: ShopUserSeller;
  // 배송비 ( 무료 , 금액 ...)
  parcel: number;
  // 원산지
  origin: string;
  // 옵션 ( 옵션명 , 금액 )
  options: { name: string; price: number }[];
  // 구매후기 | 상품평 ( 갯수 , 평균 별)
  reviews: {
    title: string;
    text: string;
    star: number;
    nickName: string;
    addDay: string;
  }[];
  // 상품문의
  QA: {
    title: string;
    text: string;
    status: string;
    nickName: string;
    addDay: string;
    type: string;
    answer?: string;
  }[];
}

// 영수중
export interface Ireceipt {
  id: number;
  title: string;
  price: string;
  options: { name: string; price: number; count: number }[];
  parcel: number; // 배송비
  // 판매자 유저 정보
  sellUserInfo: ShopUserSeller;
  totalPrice: number; // 결제한 금액
}

export const getItem = async (id: number) => {
  return new Promise<{ ok: boolean; item: Iitem }>((res, rej) => {
    setTimeout(() => {
      if (id === 6) {
        const mockItme2: Iitem = {
          thumbnailSrc:
            "https://image.iacstatic.co.kr/allkill/item/2022/07/20220720095501441r.jpg",
          detailHtml: `<p><img src="https://res.cloudinary.com/dhdq4v4ar/image/upload/v1659184276/back-Portfolio/p01daexnqe7vyphmfszj.png" alt="image" contenteditable="false"><img class="ProseMirror-separator" alt=""><br class="ProseMirror-trailingBreak"></p><p>ㅋㅋㅋㅋ </p><p>    이건 뭐냐면</p><p><br class="ProseMirror-trailingBreak"></p><p><span style="color: #86c1b9">ㅁㅇㅁㅇㅋㅌㅊㄴ</span></p>`,

          title: "[10%+12%]패션라인신상원피스/팬츠",
          price: "43000",
          sale: 70,
          id: 6,
          parcel: 2500,
          options: [
            { name: "옵션1", price: 2000 },
            { name: "옵션2", price: 3000 },
            { name: "옵션3", price: 4000 },
          ],
          origin: "상세페이지 참조",
          sellUserInfo: {
            represent: "판매자1",
            phone: "010-2020-3131",
            eMail: "test@nal.me",
            companyName: "회사명1",
            companyAddress: "회사 주소1",
          },
          reviews: [
            {
              title: "리뷰1",
              text: "리뷰내용1",
              star: 3,
              nickName: "유저1",
              addDay: "2022.02.02",
            },
            {
              title: "리뷰2",
              text: "리뷰내용2",
              star: 2,
              nickName: "유저2",
              addDay: "2022.02.02",
            },
          ],

          QA: [
            {
              title: "문의1",
              text: "문의내용1",
              addDay: "2020-02-02",
              nickName: "유저1",
              status: "답변 완료",
              type: "문의 타입",
              answer: "답내용 입니다.",
            },
          ],
        };
        res({
          ok: true,
          item: mockItme2,
        });
      } else {
        const mockItme: Iitem = {
          thumbnailSrc:
            "https://image.iacstatic.co.kr/allkill/item/2022/07/20220720100107421r.jpg",
          detailHtml: `<p><img src="https://res.cloudinary.com/dhdq4v4ar/image/upload/v1659184276/back-Portfolio/p01daexnqe7vyphmfszj.png" alt="image" contenteditable="false"><img class="ProseMirror-separator" alt=""><br class="ProseMirror-trailingBreak"></p><p>ㅋㅋㅋㅋ </p><p>    이건 뭐냐면</p><p><br class="ProseMirror-trailingBreak"></p><p><span style="color: #86c1b9">ㅁㅇㅁㅇㅋㅌㅊㄴ</span></p>`,

          title: "휠라 퐁 쏭 4종 택1",
          price: "29000",
          sale: 30,
          id: 4,
          parcel: 2500,
          options: [
            { name: "옵션1", price: 2000 },
            { name: "옵션2", price: 3000 },
            { name: "옵션3", price: 4000 },
          ],
          origin: "상세페이지 참조",
          sellUserInfo: {
            represent: "판매자1",
            phone: "010-2020-3131",
            eMail: "test@nal.me",
            companyName: "회사명1",
            companyAddress: "회사 주소1",
          },
          reviews: [
            {
              title: "리뷰1",
              text: "리뷰내용1",
              star: 3,
              nickName: "유저1",
              addDay: "2022.02.02",
            },
            {
              title: "리뷰2",
              text: "리뷰내용2",
              star: 2,
              nickName: "유저2",
              addDay: "2022.02.02",
            },
          ],
          QA: [
            {
              title: "문의1",
              text: "문의내용1",
              addDay: "2020-02-02",
              nickName: "유저1",
              status: "대기",
              type: "문의 타입",
            },
          ],
        };
        res({
          ok: true,
          item: mockItme,
        });
      }
    }, 200);
  });
};
