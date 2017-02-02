let db = require('../config/mongoose.config');

let quequeSchema = new db.Schema({

});

module.exports = db.model('Queque', quequeSchema);
