'use strict';

/**
 * Roles Model
 * @module src/auth/roles-model 
 * @requires mongoose 
 */

const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
  role: {type: String, required:true},
  capabilities: {type: Array, required:true},
});

module.exports = mongoose.model('roles', rolesSchema);
