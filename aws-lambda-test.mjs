import { handler } from "./.output/server/index.mjs";

// Use programmatically
const { statusCode, headers, body } = await handler({ rawPath: "/join" });

console.log(handler);
console.log(statusCode, headers, body);
