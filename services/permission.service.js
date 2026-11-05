const Permissions = require("../models/permissions.model");

module.exports = {
  isPermissionExist,
  addPermission,
  getPermissions,
  deletePermission,
  updatePermission,
};

/**
 * Add Permission Data into DB
 * @param {*} { permission_name, is_default }
 * @returns Permission Object
 */
async function addPermission(permission_name, is_default= 0) {
    // 1. Add Permission entry to DB and send back the result
    const permission = new Permissions({permission_name, is_default});

    const savedPermission = await permission.save();
    return savedPermission;
}

/**
 * Is any permission already exists.
 * @param {Object} _filter
 * @param {Boolean} return_obj
 * @returns [ Boolean, permission obj ]
 */
async function isPermissionExist(_filter, return_obj) {
    var exists = false;
    if (return_obj) {
        exists = await Permissions.findOne(_filter);
    } else {
        exists = await Permissions.exists(_filter);
    }
    return [ Boolean(exists), exists ];
}

/**
 * Fetch all permissions
 * @param {*} _filter object
 * @returns Array of permission
 */
async function getPermissions(_filter= {}) {
    const permissions = await Permissions.find(_filter);
    return permissions;
}

async function deletePermission(id) {
    await Permissions.findByIdAndDelete({_id: id});
    return true;
}

async function updatePermission(_filter, _updateObj) {
    const updatedPermission = await Permissions.findOneAndUpdate(
      _filter,
      { $set: _updateObj },
      { returnDocument: "after", runValidators: true },
    );
    return updatedPermission;
}