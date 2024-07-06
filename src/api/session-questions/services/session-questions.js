"use strict";

/**
 * session-questions service
 */

module.exports = () => ({
  find: async (id, query = {}) => {
    try {
      const entries = await strapi.entityService.findOne(
        "api::community-post.community-post",
        id,
        {
          fields: ["id"],
          populate: {
            questions: {
              populate: {
                votes: {
                  fields: ["id"],
                },
                author: {
                  fields: ["id"],
                },
              },
              sort: ["votesCount:desc"],
            },
          },
          ...query,
        }
      );

      return entries;
    } catch (error) {
      return error;
    }
  },

  findOne: async (id) => {
    try {
      const entry = await strapi.entityService.findOne(
        "api::community-question.community-question",
        id,
        {
          fields: ["id"],
          populate: {
            votes: {
              fields: ["id"],
            },
          },
        }
      );

      return entry;
    } catch (error) {
      return error;
    }
  },

  vote: async (questionId, userId, votesCount) => {
    try {
      const result = await strapi.entityService.update(
        "api::community-question.community-question",
        questionId,
        {
          data: {
            votes: {
              connect: [userId],
            },
            votesCount: votesCount + 1,
          },
          fields: ["id"],
        }
      );

      return result;
    } catch (error) {
      return error;
    }
  },

  unvote: async (questionId, userId, votesCount) => {
    try {
      const entry = await strapi.entityService.update(
        "api::community-question.community-question",
        questionId,
        {
          data: {
            votes: {
              disconnect: [userId],
            },
            votesCount: votesCount - 1,
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
