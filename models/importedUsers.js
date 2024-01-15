const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const Transaction = require("../models/Transaction");

const importedUsersSchema = new mongoose.Schema({ email: String });


importedUsersSchema.plugin(paginate);

const ImportedUsers = mongoose.model("ImportedUsers", importedUsersSchema);
module.exports = ImportedUsers;
