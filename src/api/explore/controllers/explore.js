"use strict";

/**
 * A set of functions called "actions" for `explore`
 */

module.exports = {
  find: async (ctx) => {
    try {
      const query = ctx?.query || {};
      const user = ctx?.state?.user || {};

      const data = await strapi.service("api::explore.explore").find(query);

      data.forEach((item) => {
        if (user.id) {
          item.liked = item.likes.some((like) => like.id === user.id);
        } else {
          item.liked = false;
        }

        delete item.likes;
      });

      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Find Controller Error", { error: err });
    }
  },

  like: async (ctx) => {
    try {
      const feedId = ctx?.params?.id;
      const userId = ctx?.state?.user?.id;

      const data = await strapi.service("api::explore.explore").findOne(feedId);

      const likes = data?.likes || [];

      if (likes.some((like) => like.id === userId)) {
        ctx.body = data;
      } else {
        const result = await strapi
          .service("api::explore.explore")
          .like(feedId, userId, likes.length);

        ctx.body = result;
      }
    } catch (err) {
      ctx.badRequest("Like Controller Error", { error: err });
    }
  },

  dislike: async (ctx) => {
    try {
      const feedId = ctx?.params?.id;
      const userId = ctx?.state?.user?.id;

      const data = await strapi.service("api::explore.explore").findOne(feedId);

      const likes = data?.likes || [];

      console.log(
        likes,
        likes.some((like) => like.id === userId)
      );

      if (likes.every((like) => like.id !== userId)) {
        ctx.body = data;
      } else {
        const result = await strapi
          .service("api::explore.explore")
          .dislike(feedId, userId, likes.length);

        ctx.body = result;
      }
    } catch (err) {
      ctx.badRequest("Dislike Controller Error", { error: err });
    }
  },
};
