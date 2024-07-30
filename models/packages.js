const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fitnessPackageSchema = new Schema({
    package_name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    duration_weeks: {
        type: Number,
        required: true,
        min: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update the updated_at field before each save
fitnessPackageSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const FitnessPackage = mongoose.model('Packages', fitnessPackageSchema);

module.exports = FitnessPackage;
