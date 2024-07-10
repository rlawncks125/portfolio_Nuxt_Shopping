const cacheName = "v1.0.2";
// 캐시할 파일
const cacheList = [
  "https://res.cloudinary.com/dhdq4v4ar/image/upload/v1661371113/transparent-bg_-no-shadow-designify_wst7my.png",
  "https://res.cloudinary.com/dhdq4v4ar/video/upload/v1676287371/nuxt-shop_lkx3qp.mp4",
  // "https://www.museum.go.kr/uploadfile/ecms/visual/773161_m.jpg?_=1661443337447",
];
// const cacheList = [];

self.addEventListener("install", (event) => {
  // 대기상태에 머무르지 않고 활성화
  // self.skipWaiting();
  console.log("install");

  // // 캐시 저장
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => cache.addAll(cacheList))
      .then(() => {
        self.skipWaiting();
      })
  );
});

self.addEventListener("activate", (event) => {
  console.log("activate");

  // 작업이 마무리될떄가지 설치단계를 연장
  event.waitUntil(
    // 불필요한 캐시 지우기
    caches
      .keys()
      .then((keylist) => {
        return Promise.all(
          keylist.map((key) => {
            if (key !== cacheName) {
              console.log("지움", key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => {
        self.clients.claim();
      })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("fetch", event.request.url);

  // const requestURL = new URL(event.request.url);

  // console.log("fetch", requestURL.pathname);

  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐시된 응답이 있다면 제공
      if (response) {
        return response;
      }

      // 캐시된 응답이 없으면 네트워크 요청
      return fetch(event.request).then((networkResponse) => {
        // 네트워크 응답이 유효한 경우에만 캐시에 저장
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.headers.get("Content-Length") !== "0"
        ) {
          return caches.open(cacheName).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        } else {
          return networkResponse;
        }
      });
      // .catch(() => {
      //   // 네트워크 요청이 실패하면 대체 콘텐츠 제공 (옵션)
      //   if (event.request.destination === "document") {
      //     return caches.match("/offline.html");
      //   }
      // });
    })
  );
});

// push 알람 처리
self.addEventListener("push", (event) => {
  console.log("push", event.data.text());

  // 보내는 데이터 형식
  // {
  //  "title":"pwa 알람 테스트입니다",
  //  "body":"바디 ㅋㅋㅋ"
  // }

  const data = JSON.parse(event.data.text());
  console.log(data);

  const title = data.title;
  const options = {
    body: data.body,
    icon:
      "https://res.cloudinary.com/dhdq4v4ar/image/upload/w_192,h_192/v1659106597/lakun_lx50mu.jpg",
    // 진동음
    vibrate: [200, 100, 200, 100, 200, 100, 200],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  console.log(event.data);
  event.waitUntil(clients.openWindow("http://shop.juchandev.store"));
});
