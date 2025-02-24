const express = require('express');
const checkAccessMiddleware = require('../../../middleware/checkAccess.middleware');
const USER_ROLE = require('../../users/enums/role.enum');
const authMiddleware = require('../../../middleware/auth.middleware');
const coursesController = require('../controllers/courses.controller');

const router = express.Router();

router.get('/', coursesController.getAllCourses);
router.post('/create', authMiddleware, checkAccessMiddleware(USER_ROLE.ADMIN), coursesController.createNew);
router.get('/categories', coursesController.getAllCategories);
router.get('/details/:courseId', coursesController.getCourseDetails);

module.exports = router;