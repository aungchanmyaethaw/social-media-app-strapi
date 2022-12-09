'use strict';

/**
 * hidepost service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hidepost.hidepost');
