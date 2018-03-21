var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var petSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    imageUrl: String,
    gender: String,
    type: String,
    price: Number,
    age: Number,
    created_at: Date,
    updated_at: Date
});

petSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;