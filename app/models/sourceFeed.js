var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sourceFeedSchema = new Schema({
    name: String,
    url: String,
    trusted: Boolean,
    created_at: Date,
    updated_at: Date
});

sourceFeedSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;
        
    next();
});

var sourceFeed = mongoose.model('sourceFeed', sourceFeedSchema);

module.exports = sourceFeed;
