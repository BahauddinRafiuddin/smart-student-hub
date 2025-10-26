import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    table_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const roleSchema = new mongoose.Schema(
  {
    role_name: {
      type: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const permissionSchema = new mongoose.Schema(
  {
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    table_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    can_read: {
      type: Boolean,
      default: false,
    },
    can_write: {
      type: Boolean,
      default: false,
    },
    can_delete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);
const Role = mongoose.model("Role", roleSchema);
const Permission = mongoose.model("Permission", permissionSchema);

export {
    Table,
    Role,
    Permission
}
