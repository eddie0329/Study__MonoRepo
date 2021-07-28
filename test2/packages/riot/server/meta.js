const getMetaValue = (raw, id) => {
  const regex = new RegExp(
    'meta data-vue-meta="ssr" data-vmid="' + id + '" content="([^"]*)"',
    "i"
  );
  return raw.match(regex)[1];
};

const build = (meta) => {
  if (!meta) return "";
  const host = process.env.VUE_APP_HOST;
  const raw = meta.inject().meta.text();
  const title = getMetaValue(raw, "title").replace(/[\n\r]/g, " ");
  const description = getMetaValue(raw, "description");
  const imageSrc = getMetaValue(raw, "image");
  const image = /^https?:\/\//.test(imageSrc) ? imageSrc : host + imageSrc;
  const keywords = getMetaValue(raw, "keywords");

  return `${meta.inject().title.text()}
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${image}">
<meta name="description" content="${description}" />
<meta name="keywords" content="${keywords}" />`;
};

const inject = (html, context) => {
  return html
    .replace(/<!--meta-outlet-->/, build(context.meta));
};

module.exports = { inject };
