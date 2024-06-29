const GradeModel = require('../models/grade');
module.exports = {
    getAll: async (req, res) => {
        try {
            const grades = await GradeModel.find({});
            res.json(grades);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const grade = await GradeModel.findById(req.params.id);
            if (grade) {
                res.json(grade);
            } else {
                res.status(404).json({ message: 'Grade not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    add: async (req, res) => {
        try {
            const { student, course, grade } = req.body;
            const newGrade = new GradeModel({ student, course, grade });
            const savedGrade = await newGrade.save();
            res.status(201).json(savedGrade);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const deletedGrade = await GradeModel.findByIdAndDelete(req.params.id);
            if (deletedGrade) {
                res.json({ success: true });
            } else {
                res.status(404).json({ message: 'Grade not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { student, course, grade } = req.body;
            const updatedGrade = await GradeModel.findByIdAndUpdate(
                req.params.id,
                { student, course, grade },
                { new: true }
            );
            if (updatedGrade) {
                res.json(updatedGrade);
            } else {
                res.status(404).json({ message: 'Grade not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
