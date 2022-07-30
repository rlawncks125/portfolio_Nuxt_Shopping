export interface Iitem {
  thumbnailSrc: string;
  detailHtml: string;
  title: string;
  price: string;
  sale: number;
  id: number;
}

export const getItem = async (id: number) => {
  return new Promise<Iitem>((res, rej) => {
    setTimeout(() => {
      if (id === 6) {
        const mockItme2 = {
          thumbnailSrc:
            "https://image.iacstatic.co.kr/allkill/item/2022/07/20220720095501441r.jpg",
          detailHtml: `<p><img src="https://res.cloudinary.com/dhdq4v4ar/image/upload/v1659184276/back-Portfolio/p01daexnqe7vyphmfszj.png" alt="image" contenteditable="false"><img class="ProseMirror-separator" alt=""><br class="ProseMirror-trailingBreak"></p><p>ㅋㅋㅋㅋ </p><p>    이건 뭐냐면</p><p><br class="ProseMirror-trailingBreak"></p><p><span style="color: #86c1b9">ㅁㅇㅁㅇㅋㅌㅊㄴ</span></p>`,

          title: "[10%+12%]패션라인신상원피스/팬츠",
          price: "43000",
          sale: 70,
          id: 6,
        };
        res(mockItme2);
      } else {
        const mockItme = {
          thumbnailSrc:
            "https://image.iacstatic.co.kr/allkill/item/2022/07/20220720100107421r.jpg",
          detailHtml: `<p><img src="https://res.cloudinary.com/dhdq4v4ar/image/upload/v1659184276/back-Portfolio/p01daexnqe7vyphmfszj.png" alt="image" contenteditable="false"><img class="ProseMirror-separator" alt=""><br class="ProseMirror-trailingBreak"></p><p>ㅋㅋㅋㅋ </p><p>    이건 뭐냐면</p><p><br class="ProseMirror-trailingBreak"></p><p><span style="color: #86c1b9">ㅁㅇㅁㅇㅋㅌㅊㄴ</span></p>`,

          title: "휠라 퐁 쏭 4종 택1",
          price: "29000",
          sale: 30,
          id: 4,
        };
        res(mockItme);
      }
    }, 100);
  });
};
