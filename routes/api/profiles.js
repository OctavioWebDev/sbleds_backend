const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/profileController');
const verifyJWT = require('../../middleware/VerifyJWT');

router.route('/')
    .get(verifyJWT, profileController.getUserProfile);

module.exports = router;
