'use strict';

/**
 * wordpress service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wordpress.wordpress');
