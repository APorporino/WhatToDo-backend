const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Task = require("./task.js");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    validate(pass) {
      if (pass.length < 7) {
        throw new Error("Must be 7 characters long");
      } else if (validator.contains(pass, "password")) {
        throw new Error("Password cannot contain password");
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(email) {
      if (!validator.isEmail(email)) {
        throw new Error("Must use a valid email adress");
      }
    },
  },
  avatar: {
    type: Buffer,
  },
}, {
  timestamps: true,

  toObject: {
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.password;
    }
  },
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.password;
    }
  }
})

//virtual list of projects user is apart of
userSchema.virtual("projects", {
  ref: "Project",
  localField: "_id",
  foreignField: "members",
  justOne: false,
});


userSchema.methods.generateAuthenticationToken = async function () {
  //this is the user passed
  //create a new token using user's id and a secret key and store it in database so user is now authenticated
  const token = jwt.sign({
    _id: this._id.toString()
  }, process.env.JWT_SECRET)
  this.tokens.push({
    token
  })
  await this.save()
  return token
};

//findByCredentials function for logging in
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({
    email
  })
  if (!user) {
    throw new Error("User with that email does not exist")
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error("Password is incorrect for this email")
  }
  return user
};

//hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

//deletes task of user before deleting user
userSchema.pre("remove", async function (next) {
  await Task.deleteMany({
    owner: this._id
  })
  next()
})

const User = mongoose.model("User", userSchema)

module.exports = User;
