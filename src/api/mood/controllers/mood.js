// @ts-nocheck
"use strict";

/**
 * mood controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::mood.mood", () => ({
  async find(ctx) {
    const userId = ctx?.state?.user?.id;

    if (userId) {
      ctx.query = {
        ...ctx.query,
        filters: { user: { $eq: userId } },
        sort: ["createdAt:desc"],
      };
    }

    const result = await super.find(ctx);

    return result;
  },

  async create(ctx) {
    const userId = ctx?.state?.user?.id;

    if (userId) {
      ctx.request.body.data = {
        ...ctx.request.body.data,
        user: userId,
      };
    }

    const result = await super.create(ctx);

    return result;
  },
}));
