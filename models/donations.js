var mongoose = require("mongoose");

var donationSchema = new mongoose.Schema({
    author: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    product: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    status: {
        type: String,
        required: true,
        trim: true,
        minlength: 0
    },
    pickup_username: {
        type: String
    },
    pickup_date: {
        type: Date, 
    },
    }, {
    timestamps: true,
});

module.exports = mongoose.model("Donation", donationSchema);
