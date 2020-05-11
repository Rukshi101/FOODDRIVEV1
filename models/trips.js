var mongoose = require("mongoose");

var tripSchema = new mongoose.Schema({
    author: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    delivery_time: { type: Date, required: true },
    pickup_list: { type: Array }, // List of all donation usernames
}, {
    timestamps: true,
});

module.exports = mongoose.model("Trip", tripSchema);
