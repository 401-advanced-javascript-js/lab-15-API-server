'use strict';

/**
 * API Router Module (V1)
 * Integrates with various models through a common Interface (.get(), .post(), .put(), .delete())
 * @module src/api/v1
 */

// Current Working Directory
const cwd = process.cwd();

const express = require('express');
const swagger = require('swagger-ui-express');
const swaggerDocs = require('../../docs/config/swagger.json');


// Figures out which model to use
const modelFinder = require(`${cwd}/src/middleware/model-finder.js`);
const auth = require(`${cwd}/src/auth/middleware.js`);

// Used for routes for each model
const router = express.Router();

// Evaluate the model, dynamically
router.param('model', modelFinder);

router.use('/api/v1/api-docs', swagger.serve, swagger.setup(swaggerDocs));

// API Routes
router.get('/api/v1/:model', handleGetAll);
router.post('/api/v1/:model', auth('create'), handlePost);

router.get('/api/v1/:model/:id', handleGetOne);
router.put('/api/v1/:model/:id', auth('update'), handlePut);
router.delete('/api/v1/:model/:id', auth('delete'), handleDelete);

// Route Handlers ----------------------------

/**
 * Gets all data for given model object and returns as array
 * of objects in JSON format with status 200
 * 
 * @param {Object} request request object with .model
 * @param {Object} response response object
 * @param {Function} next next middleware to run
 */
function handleGetAll(request, response, next) {
  request.model
    .get()
    .then((data) => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch(next);
}

/**
 * Gets data for some model with given id using model.get,
 * returns data in JSON format with status 200
 * 
 * @param {Object} request request object with .model and .params.id
 * @param {Object} response response object
 * @param {Function} next next middleware to run
 */
function handleGetOne(request, response, next) {
  request.model
    .get(request.params.id)
    .then((result) => response.status(200).json(result[0]))
    .catch(next);
}

/**
 * Posts data using model.post, returns added data with status 200
 * 
 * @param {Object} request request object with .model and .body
 * @param {Object} response response object
 * @param {Function} next next middleware to run
 */
function handlePost(request, response, next) {
  request.model
    .post(request.body)
    .then((result) => response.status(200).json(result))
    .catch(next);
}

/**
 * Updates data of model with given id, 
 * 
 * @param {Object} request request object with .model
 * @param {Object} response response object
 * @param {Function} next next middleware to run
 */
function handlePut(request, response, next) {
  request.model
    .put(request.params.id, request.body)
    .then((result) => response.status(200).json(result))
    .catch(next);
}

/**
 * Deletes data with given id (request.params.id)
 * Returns status 200 and deleted data in JSON format
 * 
 * @param {Object} request request object with .model
 * @param {Object} response response object
 * @param {Function} next next middleware to run
 */
function handleDelete(request, response, next) {
  request.model
    .delete(request.params.id)
    .then((result) => response.status(200).json(result))
    .catch(next);
}

module.exports = router;
