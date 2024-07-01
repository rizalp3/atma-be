module.exports = {
  routes: [
    {
      method: "GET",
      path: "/explore",
      handler: "explore.find",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/explore/like/:id",
      handler: "explore.like",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/explore/dislike/:id",
      handler: "explore.dislike",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
