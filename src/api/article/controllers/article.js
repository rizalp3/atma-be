"use strict";

/**
 * article controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  async findOne(ctx) {
    // Call the default parent controller action
    const result = await super.findOne(ctx);

    // Get the ID and View Count
    const id = result?.data?.id;
    const view = result?.data?.attributes?.view;

    // Update only when ID and View Count valid
    if (id && view >= 0) {
      await strapi.entityService.update("api::article.article", id, {
        data: {
          view: view + 1,
        },
      });
    }

    // Return data
    return result;
  },
}));
