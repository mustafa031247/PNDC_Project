const express = require('express')
const { registerUser, authUser, allUsers } = require("../controllers/userControllers");
const { protect } = require('../errorHandling/authMiddleWare');
const router = express.Router();



router.route('/').post(registerUser).get(protect, allUsers); // Jab protect token check kr lega tw then fr Wo allUsers k method Use kryega
router.post('/login', authUser)

module.exports = router;