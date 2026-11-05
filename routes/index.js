const { Router } = require('express');
const apiRouter =  Router();
const v1Routes = require('./v1');

// all routes centralized manner (versions)
apiRouter.use('/v1', v1Routes);

module.exports = apiRouter;