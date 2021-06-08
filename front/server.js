const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";

function port() {
  if (dev) {
    return 3002;
  } else {
    return 3000;
  }
}

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    "/endPoint",
    createProxyMiddleware({
      target: `${process.env.API_URL}`,
      changeOrigin: true,
    })
  );

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port(), (err) => {
    if (err) throw err;
    console.log(`> Ready on ${port()} ${process.env.API_URL}`);
  });
});
