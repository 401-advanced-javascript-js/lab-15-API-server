'use strict';

/**
 * Teams Model
 * @module models/teams/teams-model
 */

const Model = require('../mongo-model.js');
const schema = require('./teams-schema.js');

// Teams class
class Teams extends Model {}

// instance of Teams object
module.exports = new Teams(schema);

