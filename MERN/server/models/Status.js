const mongoose = require ('mongoose');

const StatusSchema = new mongoose.Schema ({
    status: {type: String},
    postby: {type: mongoose.Schema.Types.ObjectId}
   
});
 
module.exports = mongoose.model ('Status', StatusSchema);
