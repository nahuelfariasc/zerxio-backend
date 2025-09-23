'use strict';

/**
 * wordpress router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::wordpress.wordpress');
