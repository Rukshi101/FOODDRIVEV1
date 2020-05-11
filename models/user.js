var mongoose = require("mongoose");
var passportLocalMongoose = require ("passport-local-mongoose");
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
      },
      password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
      },
      phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4
      },
    
      address: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
      },
    
      postal_code: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
      },
    
      latitude : {
        type: Number
      },
    
      longitude: {
        type: Number
      }

});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);
//export user schema under the name User