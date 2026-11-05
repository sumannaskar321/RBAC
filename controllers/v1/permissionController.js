const {
  isPermissionExist,
  addPermission,
  getPermissions,
  deletePermission,
  updatePermission,
} = require("../../services/permission.service");

const add = async (req, res) => {
  try {
    const { permission_name, default: is_default } = req.body;

    // Dupliacte check
    const [isExist] = await isPermissionExist({ permission_name });
    if (isExist) {
      return res.status(409).json({
        success: false,
        msg: "Permission already exists.",
      });
    }

    await addPermission(permission_name, is_default);

    // Success response
    return res.status(201).json({
      success: true,
      msg: "Permission created Successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

const fetch = async (req, res) => {
  try {
    const permissions = await getPermissions();
    return res.status(200).json({
      success: true,
      data: permissions,
      msg: "Permissions fetched successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

const del = async (req, res) => {
  try {
    const { id } = req.body;
    await deletePermission(id);

    return res.status(200).json({
      success: true,
      msg: "Permission delete successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id, permission_name, default: is_default } = req.body;

    // check id availability
    const [isExists, permissionObj] = await isPermissionExist(
      { _id: id },
      true,
    );
    if (!isExists) {
      return res.status(404).json({
        success: false,
        msg: "Permission not exists.",
      });
    }

    // Dupliacte check
    const [isNameAssigned, duplicateObj] = await isPermissionExist({
      _id: { $ne: id },
      permission_name: { $eq: permission_name },
    });

    if (isNameAssigned) {
      return res.status(409).json({
        success: false,
        msg: "Permission name already exists.",
      });
    }

    const updateObj = {
      permission_name,
      is_default: is_default != null ? is_default : permissionObj.is_default,
    };

    const _updatedPermission = await updatePermission({ _id: id }, updateObj);

    // Success response
    return res.status(201).json({
      success: true,
      msg: "Permission created Successfully.",
      data: _updatedPermission,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports = {
  add,
  fetch,
  del,
  update,
};
