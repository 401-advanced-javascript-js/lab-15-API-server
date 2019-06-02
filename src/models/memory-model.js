'use strict';

/**
 * Memory Model
 * @module models/memory-model
 */

const uuid = require('uuid/v4');

class Model {

  constructor(schema) {
    this.schema = schema;
    this.database = [];
  }

  /**
   * Validate input data, returns undefined if invalid and formated data if valid
   * @param {Object} entry 
   */
  sanitize(entry) {

    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach( field => {
      if ( this.schema[field].required ) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });
    
    return valid ? record : undefined;
  }
  
  /**
   * size of data
   */
  count() {
    return this.database.length;
  }

  /**
   * Gets data with passed id
   * 
   * @param {string} id 
   */
  get(id) {
    const records = id ? this.database.filter( (record) => record._id === id ) : this.database;
    return Promise.resolve(records);
  }

  /**
   * Adds id to data and adds it to database
   * @param {Object} entry 
   */
  post(entry) {
    entry._id = uuid();
    let record = this.sanitize(entry);
    if ( record._id ) { this.database.push(record); }
    return Promise.resolve(record);
  }

  /**
   * deletes data with passed id from database
   * @param {string} id 
   */
  delete(id) {
    this.database = this.database.filter((record) => record._id !== id );
    return this.get(id);
  }

  /**
   * updates data with passed id to passed data if valid entry data
   * if entry data is not valid, returns unchanged data
   * @param {string} id 
   * @param {Object} entry 
   */
  put(id, entry) {
    let record = this.sanitize(entry);
    if( record._id ) { this.database = this.database.map((item) => (item._id === id) ? record : item  ); }
    return this.get(id);
  }
  
}

module.exports = Model;