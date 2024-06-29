const CourseModel = require('../models/course');
module.exports = {
    get: ('/all', ApiSecurity.requireLogin, async (req, res) => {
    try {
        const courses = await CourseModel.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    }),
    get: ('/:id', ApiSecurity.requireLogin, async (req, res) => {
    try {
        const course = await CourseModel.findById(req.params.id);
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    }),
    post: ('/add', ApiSecurity.requirePermits('manage_courses'), async (req, res) => {
    const { courseCode, title, description, instructor, schedule } = req.body;
    const newCourse = new CourseModel({ courseCode, title, description, instructor, schedule });
    try {
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    }),
    delete: ('/:id', ApiSecurity.requirePermits('manage_courses'), async (req, res) => {
        try {
            const deletedCourse = await CourseModel.findByIdAndDelete(req.params.id);
            if (deletedCourse) {
                res.json(deletedCourse);
            } else {
                res.status(404).json({ message: 'Course not found' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }),
    put: ('/:id', ApiSecurity.requirePermits('manage_courses'), async (req, res) => {
        const { courseCode, title, description, instructor, schedule } = req.body;
        try {
            const updatedCourse = await CourseModel.findByIdAndUpdate(
                req.params.id,
                { courseCode, title, description, instructor, schedule },
                { new: true }
            );
            if (updatedCourse) {
                res.json(updatedCourse);
            } else {
                res.status(404).json({ message: 'Course not found' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })
}