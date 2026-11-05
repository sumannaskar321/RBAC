const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    permission_name: { type: String, required: true, trim:true },
    is_default: { type: Number, default: 0 }, // 0-> not default, I-> default
  },
  { timestamps: true },
);

module.exports = mongoose.model("Permission", permissionSchema);
