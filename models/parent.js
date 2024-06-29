const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    children: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, 
        relationship: { type: String } 
    }]
}, {
    collection: 'parents',    
    timestamps: true,         
    read: 'nearest',          
    writeConcern: {           
        w: 'majority',        
        j: true,              
        wtimeoutMS: 30000     
    }
});

const ParentModel = mongoose.model('Parent', parentSchema);
module.exports = ParentModel;