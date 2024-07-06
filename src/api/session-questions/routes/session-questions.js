module.exports = {
  routes: [
    {
      method: "GET",
      path: "/session-questions/:id",
      handler: "session-questions.find",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/session-questions/vote/:id",
      handler: "session-questions.vote",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/session-questions/unvote/:id",
      handler: "session-questions.unvote",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
