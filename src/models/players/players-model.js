'use strict';

/**
 * Players Model
 * @module models/players/players-model
 */

const Model = require('../mongo-model.js');
const schema = require('./players-schema.js');

// Players Class 
class Players extends Model {}

// Exports instance of Players object
module.exports = new Players(schema);

