const { Router } = require('express');
const userRoutes = require('./userRoutes');
const permissionRoutes = require('./permissionRoutes');

// all routes centralized manner (modules)
const router = Router();

router.use('/user', userRoutes);
router.use('/permission', permissionRoutes);

module.exports = router;