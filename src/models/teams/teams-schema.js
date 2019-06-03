'use strict';

/**
 * Teams Schema
 * @module models/teams/teams-schema
 */

const players = require('../players/players-schema.js');
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const teams = mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

// 
teams.virtual('players', {
  ref: 'players',
  localField: 'name',
  foreignField: 'team',
  justOne: false,
});

// PreHook middleware for teams, adds players
teams.pre('find', function() {
  try {
    this.populate('players');
  } catch (e) {
    console.error('Find Error', e);
  }
});

module.exports = mongoose.model('teams', teams);
