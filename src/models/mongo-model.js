'use strict';

/**
 * Mongo Model
 * @module models/mongo-model
 */

// Standard Model object that other models build off of
class Model {

  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Calls Mongoose's .find() to get data with passed id or all data if no id given
   * Returns results of request
   * 
   * @param {string} _id 
   */
  get(_id) {
    console.log('get mongo-model');
    let queryObject = _id ? {_id} : {};
    // console.log(this.schema.find(queryObject));
    return this.schema.find(queryObject).then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      console.log(output);
      return output;
    });
  }
  
  /**
   * Calls Mongoose's .save() to add data
   * Returns results of request
   * 
   * @param {Object} record
   */
  post(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  /**
   * Calls Mongoose's .findByIdAndUpdate() to update data with passed id
   * Returns updated data
   * 
   * @param {string} _id 
   * @param {Object} record 
   */
  put(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, {new:true});
  }

  /**
   * Calls Mongoose's .findByIdandDelete() to delete data with passed id
   * Returns status indicating success or failure
   * 
   * @param {string} _id 
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }

}

module.exports = Model;
