const mongoose = require('mongoose')
Schema = mongoose.Schema;

// create License Schema & Model
const LicenseSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: 'school',
    index: true,
    required: [true, 'School Id field is required']
  },
  package: {
    type: String,
    lowercase: true,    
    required: [true, 'Package (personal, bussiness and enterprise) field is required']
  },
  duration: {
    type: Number,
    default: 1
  },
  cost: {
    type: Number,
    default: 0
  },
  createBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Create By field is required']
  },
  expireAt: {
    type: Date,
    index: true,
    required: [true, 'Exprire At  field is required']
  }
}, {timestamps: true});

const License = mongoose.model('license', LicenseSchema);
module.exports = License;
