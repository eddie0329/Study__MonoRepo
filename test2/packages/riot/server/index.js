require("dotenv").config();
const path = require("path");
const express = require("express");
const server = express();
const { createBundleRenderer } = require("vue-server-renderer");
const template = require("fs").readFileSync("./server/template.html", "utf-8");
const serverBundle = require("../dist/vue-ssr-server-bundle.json");
const clientManifest = require("../dist/vue-ssr-client-manifest.json");
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest,
});

const resolve = (file) => path.resolve(__dirname, file);
const serve = (urlPath, cache) =>
  express.static(resolve(urlPath), { maxAge: cache ? 60 * 60 * 24 * 30 : 0 });

server.use("/js", serve("../dist/js", true));
server.use("/assets", serve("../dist/assets", true));
server.use("/favicon.ico", serve("../dist/favicon.ico", true));

server.get("*", (req, res) => {
  const context = { url: req.url };
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.error(err);
      if (err.code === 404) {
        res.status(404).send("400");
      } else {
        res.status(500).send("500");
      }
    } else {
      res.header("Content-Type", "text/html");
      res.end(html);
    }
  });
});

server.listen(3000, () => {
  console.log("server started at port 3000");
});
