const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/profileController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(profileController.getAllUsers)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), profileController.createNewUser)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), profileController.updateUser)
    .delete(verifyRoles(ROLES_LIST.Admin), profileController.deleteUser);

router.route('/:id')
    .get(profileController.getUser);

module.exports = router;