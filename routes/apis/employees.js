const express = require('express')
const router = express.Router()
const employeesController = require('../../controller/employeesController')
const ROLE_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles')



router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRoles(ROLE_LIST.User, ROLE_LIST.Admin),employeesController.postEmployees)
    .put(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor),employeesController.putEmployees)
    .delete(verifyRoles(ROLE_LIST.Admin),employeesController.deleteEmployees)

router.route('/:id')
    .get(employeesController.getEmployee)

module.exports = router