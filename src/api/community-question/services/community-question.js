'use strict';

/**
 * community-question service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::community-question.community-question');
