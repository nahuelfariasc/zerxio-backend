'use strict';

/**
 * wordpress controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wordpress.wordpress');
