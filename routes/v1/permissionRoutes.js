const { Router } = require('express');
const permissionController = require('../../controllers/v1/permissionController.js')
const {
  addPermissionValidator,
  permissionDeleteValidator,
  permissionUpdateValidator
} = require("../../helpers/permissionApiInputValidator.js");
const { validate } = require('../../middlewares/validate.js');
const { verifyAuthToken } = require('../../middlewares/authentication.js');
const { onlyAdminAccess } = require('../../middlewares/adminMiddleware.js');
// all routes centralized manner (individual api routes)
const router = Router();

router.post(
  "/add",
  verifyAuthToken,
  onlyAdminAccess,
  validate(addPermissionValidator),
  permissionController.add,
);

router.get(
  "/get-permissions",
  verifyAuthToken,
  onlyAdminAccess,
  permissionController.fetch
);

router.delete(
  "/delete-permission",
  verifyAuthToken,
  onlyAdminAccess,
  validate(permissionDeleteValidator),
  permissionController.del
);

router.patch(
  "/update-permission",
  verifyAuthToken,
  onlyAdminAccess,
  validate(permissionUpdateValidator),
  permissionController.update,
);
module.exports = router;