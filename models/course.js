const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    instructor: { type: String },
    schedule: { type: String }
}, {

    collection: 'courses',  
    timestamps: true,        
    read: 'nearest',         
    writeConcern: {          
        w: 'majority',       
        j: true,             
        wtimeoutMS: 30000    
    }
});

const CourseModel = mongoose.model('Course', courseSchema);
module.exports = CourseModel;
