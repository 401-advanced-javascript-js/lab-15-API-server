'use strict';

/**
 * Categories Model
 * @module models/categories/categories-model
 */

const Model = require('../memory-model.js');

const schema = {
  _id: {required:true},
  name: {required:true},
};

// Model for Categories
class Categories extends Model {}

// Export Categories instance
module.exports = new Categories(schema);
