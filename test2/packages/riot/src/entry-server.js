import createApp from "./app";

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    router
      .push(context.url)
      .then(async () => {
        const matchedComponents = router.getMatchedComponents();
        console.log({ matchedComponents, context });
        if (!matchedComponents.length)
          return reject({ code: 404, message: "No Matched Components." });
        context.rendered = () => {
          context.state = store.state;
        };
        resolve(app);
      })
      .catch((e) => {
        reject({ code: 500, message: e.message || e });
      });
  });
};
