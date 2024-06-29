const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    jsd: { type: Date },
    dob: { type: Date },
    subjects: [{
        code: { type: String },
        name: { type: String }
    }]
}, {
    collection: 'teachers',
    timestamps: true,
    read: 'nearest',
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeoutMS: 30000
    }
});

const Model = mongoose.model('Teachers', teacherSchema);
module.exports = Model;