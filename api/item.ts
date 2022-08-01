export interface Iitem {
  thumbnailSrc: string;
  detailHtml: string;
  title: string;
  price: string;
  sale: number;
  id: number;
  // 판매자 정보 ( 회사 , 유저 정보 )
  sellUserInfo: {
    nickName: string;
  };
  // 배송비 ( 무료 , 금액 ...)
  parcel: number;
  // 원산지
  origin: string;
  // 옵션 ( 옵션명 , 금액 )
  options: { name: string; price: number }[];
  // 구매후기 | 상품평 ( 갯수 , 평균 별)
  reviews: {
    avgStar: number;
    count: number;
    review: {
      title: string;
      text: string;
    }[];
  };
  // 상품문의
  QA: { title: string; text: string }[];
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
          parcel: 3000,
          options: [
            { name: "옵션1", price: 2000 },
            { name: "옵션2", price: 3000 },
            { name: "옵션3", price: 4000 },
          ],
          origin: "상세페이지 참조",
          sellUserInfo: {
            nickName: "판매자1",
          },
          reviews: {
            avgStar: 4,
            count: 3,
            review: [{ title: "리뷰1", text: "리뷰내용1" }],
          },
          QA: [
            {
              title: "문의1",
              text: "문의내용1",
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
          parcel: 3000,
          options: [{ name: "옵션1", price: 2000 }],
          origin: "상세페이지 참조",
          sellUserInfo: {
            nickName: "판매자1",
          },
          reviews: {
            avgStar: 4,
            count: 3,
            review: [{ title: "리뷰1", text: "리뷰내용1" }],
          },
          QA: [
            {
              title: "문의1",
              text: "문의내용1",
            },
          ],
        };
        res({
          ok: true,
          item: mockItme,
        });
      }
    }, 100);
  });
};
