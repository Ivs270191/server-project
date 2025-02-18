import mongoose from 'mongoose';



const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,

    },
    completed: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    role: {
        type: String,
        default: 'task'
    }
});

const task = mongoose.model('task', taskSchema);

export default task;