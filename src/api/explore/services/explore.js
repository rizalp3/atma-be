"use strict";

/**
 * explore service
 */

module.exports = () => ({
  find: async (query = {}) => {
    try {
      const entries = await strapi.entityService.findMany("api::feed.feed", {
        fields: ["content", "createdAt"],
        populate: {
          likes: {
            fields: ["id"],
          },
        },
        ...query,
      });

      return entries;
    } catch (error) {
      return error;
    }
  },

  findOne: async (id) => {
    try {
      const entry = await strapi.entityService.findOne("api::feed.feed", id, {
        fields: ["id"],
        populate: {
          likes: {
            fields: ["id"],
          },
        },
      });

      return entry;
    } catch (error) {
      return error;
    }
  },

  like: async (feedId, userId, likesCount) => {
    try {
      const result = await strapi.entityService.update(
        "api::feed.feed",
        feedId,
        {
          data: {
            likes: {
              connect: [userId],
            },
            likesCount: likesCount + 1,
          },
          fields: ["id"],
        }
      );

      return result;
    } catch (error) {
      return error;
    }
  },

  dislike: async (feedId, userId, likesCount) => {
    try {
      const entry = await strapi.entityService.update(
        "api::feed.feed",
        feedId,
        {
          data: {
            likes: {
              disconnect: [userId],
            },
            likesCount: likesCount - 1,
          },
          fields: ["id"],
        }
      );

      return entry;
    } catch (error) {
      return error;
    }
  },
});
