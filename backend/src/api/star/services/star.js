'use strict';

/**
 * star service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::star.star');
