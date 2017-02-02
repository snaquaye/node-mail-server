let db = require('../../../config/mongoose.config');

let Schema = db.Schema;

let templateSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    maxlength: 250
  },
  template: String,
  fileName: String,
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});

templateSchema.pre('save', next => {
  if (!this.isNew) {
    this.updatedOn = Date.now;
  }

  next();
});

module.exports = db.model('Template', templateSchema);
