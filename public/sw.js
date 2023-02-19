const cacheName = "v1.0.1";
const cacheList = [""];

self.addEventListener("install", () => {
  // 대기상태에 머무르지 않고 활성화
  self.skipWaiting();
  // console.log("install");

  // 캐시 저장
  caches.open(cacheName).then((cache) => {
    console.log("캐시 저장");
    return cache.addAll(cacheList);
  });
});

self.addEventListener("activate", (event) => {
  // console.log("activate");

  // 작업이 마무리될떄가지 설치단계를 연장
  event.waitUntil(
    // 불필요한 캐시 지우기
    caches.keys().then((keylist) => {
      return Promise.all(
        keylist.map((key) => {
          if (key !== cacheName) {
            console.log("지움", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("fetch", event.request.url);

  // 캐싱된 데이터 fetch하기
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
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
  event.waitUntil(clients.openWindow("http://nuxt-shop.kimjuchan97.xyz"));
});
