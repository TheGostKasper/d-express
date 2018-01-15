
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var interestSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    imageUrl: String,
    type: String,
    hits: Number,
    sources: [{
        _id: Schema.ObjectId,
        name: String,
        url: String,
        trusted: Boolean,
    }],
    created_at: Date,
    updated_at: Date
});
interestSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    this.sources.forEach(ele => {
        ele._id = mongoose.Types.ObjectId()
    });
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

var Interests = mongoose.model('Interests', interestSchema);

module.exports = Interests;
