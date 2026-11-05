const mongoose = require("mongoose");

const userPermissionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // 0-> create, 1-> read, 2-> edit, 3-> Delete
    permissions: [{ permission_name: String, permission_value: [Number] }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("UserPermission", userPermissionSchema);
