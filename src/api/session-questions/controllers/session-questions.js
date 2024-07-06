"use strict";

/**
 * A set of functions called "actions" for `session-questions`
 */

module.exports = {
  find: async (ctx) => {
    try {
      const postId = ctx?.params?.id;
      const userId = ctx?.state?.user?.id;

      const query = ctx?.query || {};

      const data = await strapi
        .service("api::session-questions.session-questions")
        .find(postId, query);

      if (data?.questions?.length > 0) {
        data.questions.forEach((question) => {
          if (userId) {
            question.voted = question.votes.some((vote) => vote.id === userId);
            question.authored = question?.author?.id === userId;
          } else {
            question.voted = false;
            question.authored = false;
          }

          delete question.votes;
          delete question.author;
        });
      }

      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Find Controller Error", { error: err });
    }
  },

  vote: async (ctx) => {
    try {
      const questionId = ctx?.params?.id;
      const userId = ctx?.state?.user?.id;

      const data = await strapi
        .service("api::session-questions.session-questions")
        .findOne(questionId);

      const votes = data?.votes || [];

      if (votes.some((vote) => vote.id === userId)) {
        ctx.body = data;
      } else {
        const result = await strapi
          .service("api::session-questions.session-questions")
          .vote(questionId, userId, votes.length);

        ctx.body = result;
      }
    } catch (err) {
      ctx.badRequest("Vote Controller Error", { error: err });
    }
  },

  unvote: async (ctx) => {
    try {
      const questionId = ctx?.params?.id;
      const userId = ctx?.state?.user?.id;

      const data = await strapi
        .service("api::session-questions.session-questions")
        .findOne(questionId);

      const votes = data?.votes || [];

      if (votes.every((vote) => vote.id !== userId)) {
        ctx.body = data;
      } else {
        const result = await strapi
          .service("api::session-questions.session-questions")
          .unvote(questionId, userId, votes.length);

        ctx.body = result;
      }
    } catch (err) {
      ctx.badRequest("Unvote Controller Error", { error: err });
    }
  },
};
