const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, 
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },   
    grade: { type: String, required: true }  
}, {
    collection: 'grades',    
    timestamps: true,        
    read: 'nearest',         
    writeConcern: {          
        w: 'majority',       
        j: true,             
        wtimeoutMS: 30000    
    }
});

const GradeModel = mongoose.model('Grade', gradeSchema);
module.exports = GradeModel;