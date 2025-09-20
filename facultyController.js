const Project = require('../models/Project');
const Submission = require('../models/Submission');
const Evaluation = require('../models/Evaluation');

// Feature 3.1: Faculty dashboard - view all projects created by them
exports.getMyProjects = async (req, res) => {
    try {
        const projects = await Project.find({ faculty: req.user.id })
            .populate('students', ['name', 'email'])
            .sort({ createdAt: -1 });

        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Feature 3.2: Faculty dashboard - view submissions for a specific milestone
exports.getMilestoneSubmissions = async (req, res) => {
    try {
        const { milestoneTitle } = req.params;
        const submissions = await Submission.find({ milestone: milestoneTitle })
            .populate('student', ['name', 'email'])
            .populate('project', ['title']);

        res.json(submissions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Feature 3.3: Faculty dashboard - view evaluations they have given
exports.getMyEvaluations = async (req, res) => {
    try {
        const evaluations = await Evaluation.find({ faculty: req.user.id })
            .populate('student', ['name', 'email'])
            .populate('submission', ['milestone'])
            .sort({ createdAt: -1 });

        res.json(evaluations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
