const mongoose = require('mongoose'),
Schema = mongoose.Schema;
// https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcrypt');


// create User Schema & Model
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First Name field is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name field is required']
  },
  email: {
    type: String,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  country: {
    type: String,
    default: "+855"
  },
  telephone: {
    type: String,
    index: true,
    required: [true, 'Telephone field is required']
  },
  password: {
    type: String,
    required: [true, 'Password field is required']
  },
  gender: {
    type: String,
    required: [true, 'Gender field is required']
  },
  level: {
    type: String,
    required: [true, 'Level field is required. eg:(Teacher or Student)']
  },
  profileImage: String,
  coverImage: String,
  education: String,
  tokens: [{
    ip: String,
    device: String,
    token: {
      type: String,
      index: true,
      required: [true, 'Token field is required']
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  setting: {
    notification: {
      type: Boolean,
      default: true
    },
    language: {
      type: String,
      default: "en-US"
    }
  },
  permission: {
    level: {
      type: String,
      lowercase: true
    },
    schoolId: {
      type: Schema.Types.ObjectId,
      ref: 'school'
    },
    isView: Boolean,
    isInsert: Boolean,
    isUpdate: Boolean,
    isDelete: Boolean
  },
  active: {
    type: Boolean,
    default: true,
    index: true
  }
}, {timestamps: true});

UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}


const User = mongoose.model('user', UserSchema);
module.exports = User;
