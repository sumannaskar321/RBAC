const { check } = require('express-validator');


exports.addPermissionValidator = [
  check("permission_name", "Permission name is required.").trim().notEmpty(),
  check('default', 'Default need a valid number').optional({values: 'falsy'}).isInt({min: 0, max:1}).toInt()
];

exports.permissionDeleteValidator = [
  check("id", "Id is required.").trim().notEmpty(),
];

exports.permissionUpdateValidator = [
  check("id", "Id is required.").trim().notEmpty(),
  check("permission_name", "Permission name is required.").trim().notEmpty(),
];

