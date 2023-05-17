/**
 * Module dependencies.
 */
var express = require('express');

/**
 * Router initialization.
 */
var router = express.Router();

/**
 * Route: GET /
 * Description: Retrieves user listing.
 * Response: Sends a response with the message 'respond with a resource'.
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * Export the router module.
 */
module.exports = router;
