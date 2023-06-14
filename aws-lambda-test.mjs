import { handler } from "./.output/server/index.mjs";
import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("HELLO ");
});

// 루트 경로에 대한 GET 요청 핸들러
app.get("/:url", async (req, res) => {
  const urlPath = req.params.url;
  // Use programmatically
  const { statusCode, headers, body } = await handler({
    rawPath: "/" + urlPath,
  });

  if (statusCode === 200) {
    res.header(headers);
    res.send(body);
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
